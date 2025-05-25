const payments = [];

const retryDelays = [2, 5, 10, 20, 30, 60]; 

// protome 1 second por por ekta random transaction generate kore
setInterval(() => {
  const trx = generateRandomTransaction();
  trx.status = 'pending';               // protom panding take
  trx.attemptCount = 0;                 // protom chesta
  trx.nextAttemptAt = new Date(); 
  payments.push(trx);
  console.log("New transaction:", trx);
}, 1000);

// rendom transation generate kore
function generateRandomTransaction() {
  const id = Math.floor(Math.random() * 1000);
  const amount = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

  return {
    trxId: id,
    amount,
    timestamp: new Date().toISOString()
  };
}

// success hole
function netfeeCustomerRecharge(trx) {
  console.log("Success:", trx.trxId);
}

// process er mul function
function processNextMessage() {
  const now = new Date();

  // FIFO poddtite panding ba rejected status er message ber kore
  const message = payments.find(
    m =>
      (m.status === 'pending' || m.status === 'rejected') &&
      new Date(m.nextAttemptAt) <= now
  );

  if (!message) {
    console.log("No message ready to process at", now.toISOString());
    return;
  }

  console.log("Processing trxId:", message.trxId, "| Attempt:", message.attemptCount + 1);

  const random = Math.floor(Math.random() * 1000);

  if (message.trxId === random) {
    // message success hole
    message.status = 'success';
    message.successAt = new Date();
    netfeeCustomerRecharge(message);
  } else {
    // message berto hole
    message.attemptCount += 1;

    // 6 bar retry korear por ata staye vabe bondo ba status faild hoye jabe
    if (message.attemptCount >= 6) {
      message.status = 'failed';
      console.log(`Permanently failed after 6 attempts: trxId ${message.trxId}`);
      return;
    }

    message.status = 'rejected';

    const delay =
      message.attemptCount <= retryDelays.length
        ? retryDelays[message.attemptCount - 1]
        : 60;

    const nextRetry = new Date(now.getTime() + delay * 60 * 1000);
    message.nextAttemptAt = nextRetry;

    console.log(
      `Failed: trxId ${message.trxId} != ${random}. Retry in ${delay} minutes at ${nextRetry.toISOString()}`
    );
  }
}

//proti 3 second e poroborti message process kore
setInterval(processNextMessage, 3000);
