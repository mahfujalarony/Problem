const unitToMilligrams = {
  tons: 1_000_000_000,
  kilograms: 1_000_000,
  grams: 1_000,
  milligrams: 1
};

// sobgula man ke  miligream korar function
function convertToMilligrams(stock) {
  return (
    stock.tons * unitToMilligrams.tons +
    stock.kilograms * unitToMilligrams.kilograms +
    stock.grams * unitToMilligrams.grams +
    stock.milligrams * unitToMilligrams.milligrams
  );
}

// miligream theke aber tons, kilograms, grams, milligrams bananur function
function convertFromMilligrams(totalMg) {
  const tons = Math.floor(totalMg / unitToMilligrams.tons);
  totalMg %= unitToMilligrams.tons;

  const kilograms = Math.floor(totalMg / unitToMilligrams.kilograms);
  totalMg %= unitToMilligrams.kilograms;

  const grams = Math.floor(totalMg / unitToMilligrams.grams);
  totalMg %= unitToMilligrams.grams;

  const milligrams = totalMg;

  return { tons, kilograms, grams, milligrams };
} 


function updateStock(initialStock, changeStock, isPurchase = true) {
  const initialMg = convertToMilligrams(initialStock);  //initial ke milligrams e convert korlam
  const changeMg = convertToMilligrams(changeStock);    // changeStock keo milligrams e convert korlam

  // aber jodi isPurchase false hoy mane bikroy hoy tahole total/initial theke mainus korbo. ar jodi nonton mal kroy kori tahole plus korbo
  const updatedMg = isPurchase ? initialMg + changeMg : initialMg - changeMg;

  return convertFromMilligrams(updatedMg);
}


const initialStock = { tons: 1, kilograms: 0, grams: 0, milligrams: 0 };
const sale = { tons: 0, kilograms: 0, grams: 2, milligrams: 0 };

const result = updateStock(initialStock, sale, false); // false delam mane bikroy kora hoyce

console.log("Updated stock:", result);
