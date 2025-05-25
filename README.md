# Problem 1: Mojo and Mutki Exchange Calculation
Initial Conditions:
Start with 10 Mojos.

Each Mojo consumed yields 1 Mutki.

3 Mutkis can be exchanged for 1 Mojo.

Step-by-Step Simulation:
Eat 10 Mojos → Get 10 Mutkis

Exchange 9 Mutkis → Get 3 Mojos (3 sets of 3 Mutkis)
 Remaining Mutkis: 1

Eat 3 Mojos → Get 3 Mutkis
 Total Mutkis: 1 (leftover) + 3 = 4

Exchange 3 Mutkis → Get 1 Mojo
 Remaining Mutkis: 1

Eat 1 Mojo → Get 1 Mutki
 Total Mutkis: 1 (leftover) + 1 = 2 (not enough to exchange anymore) ❌

Total Mojos Eaten:
Initial Mojos: 10

From exchanges: 3 + 1 = 4

Total = 14 Mojos consumed


Problem 2: Inventory Management with Multiple Units
Goal:
Accurately manage stock across multiple units — tons, kilograms, grams, milligrams — by converting all quantities to a base unit (milligrams), performing stock updates, and then normalizing the result.
Unit Hierarchy (in milligrams):
Unit
Equivalent in milligrams
1 ton
1,000,000,000 mg
1 kilogram
1,000,000 mg
1 gram
1,000 mg
1 milligram
1 mg

Process:
Convert all stock quantities to milligrams.

Perform addition or subtraction depending on whether it is a purchase or sale.

Convert the resulting total back into tons, kilograms, grams, and milligrams.

Example:
initial_stock = {"tons": 1, "kilograms": 0, "grams": 0, "milligrams": 0}
 {"tons": 0, "kilograms": 999, "grams": 0, "milligrams": 0}
after_sale = update_stock(initial_stock, {"tons": 0, "kilograms": 0, "grams": 1, "milligrams": 0}, "sell")
# Result: {'tons': 0, 'kilograms': 999, 'grams': 999, 'milligrams': 0}

after_purchase = update_stock(after_sale, {"tons": 0, "kilograms": 0, "grams": 1001, "milligrams": 0}, "purchase")
# Result: {'tons': 1, 'kilograms': 0, 'grams': 1, 'milligrams': 0}


Problem 3: Message Processing with Retry Logic (Random ID Validation)
System Overview:
You are designing a backend system to process incoming messages (e.g., SMS or webhook events) stored in a database. The system must follow these rules:
Processing Order:
Always pick the first message that is either:

Unsent (pending), or

Previously rejected but eligible for retry

Maintain First-In-First-Out (FIFO) order.

Validation:
Each message contains a transaction ID (trxId).

Instead of regex validation, validate by comparing the trxId to a randomly generated number (e.g., using Math.floor(Math.random() * 1000)).

If the trxId matches the random number, the transaction is considered valid (success).

Otherwise, it is invalid (failure).

Retry Logic:
On validation failure:

Mark the message as rejected.

Increment its attemptCount.

Schedule the next retry with increasing delay intervals:

Attempt Number
Retry Delay
1st failure
2 minutes
2nd failure
5 minutes
3rd failure
10 minutes
4th failure
20 minutes
5th failure
30 minutes
6th or more
60 minutes

Retry delays cap at 60 minutes for the 6th failure and beyond.

On Success:
Mark the message as success.

Trigger any post-success logic (e.g., netfeeCustomerRecharge()).

Scalability (Optional):
Use cron jobs, message queues (e.g., BullMQ, RabbitMQ, Redis), or task schedulers (e.g., Agenda, Bree) for reliable processing and retry management.


Demo: Payment Data Generator (db.js)
const payments = [];

function generateRandomTransaction() {
  const id = Math.floor(Math.random() * 1000);
  const amount = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

  return {
    id,
    amount,
    timestamp: new Date().toISOString()
  };
}

// Generate a new transaction every second
setInterval(() => {
  const trx = generateRandomTransaction();
  payments.push(trx);
  console.log("New transaction added:", trx);
}, 1000);

This script simulates incoming transactions with a random id between 0 and 999.

Your system will validate messages by checking if the transaction ID matches a randomly generated number during processing.

How to approach this:
1. Backend with real DB (MongoDB or PostgreSQL):
Store all incoming messages (transactions) in a database collection/table.

Implement logic to:

Find the first pending or rejected message due for processing (FIFO)

Validate the transaction ID by generating a random number and comparing it.

If invalid, update message with attemptCount++, mark rejected, and set nextAttemptAt according to retry delays.

If valid, mark success and call a mock netfeeCustomerRecharge() function.

Implement a periodic job (cron or interval) to process the next eligible message.

2. Frontend / Demo usage:
Use your existing payments array as a simulated in-memory DB.

Use JS array methods (find, filter, map, push) to:

Find the next message to process.

Update its status, attempts, next retry time, etc.

This part is purely for demo or frontend simulation, no real DB involved here.
