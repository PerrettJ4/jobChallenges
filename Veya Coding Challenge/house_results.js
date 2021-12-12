const house_json = require("./House_List.json");

const house_data = house_json.map((house) => {
  // reshaping the data to include Postal Area Code
  const Area = house.Postcode.split(" ")[0];
  // converging Price columns 3, 4 & 5 together
  const priceStr = house.Price.slice(1) + house.field4 + house.field5;
  const Price = priceStr.replace(/.00|undefined/gi, "");
  return {
    Address: house.Address,
    Postcode: house.Postcode,
    Area,
    Price,
  };
});

// Sort functions
const byPriceAsc = (a, b) => a.Price - b.Price;
const byPriceDesc = (a, b) => b.Price - a.Price;
// The most expensive
const mostExpensiveHouses = (NumOfResults) =>
  house_data.sort(byPriceDesc).slice(0, NumOfResults);
// The cheapest
const cheapestHouses = (NumOfResults) =>
  house_data.sort(byPriceAsc).slice(0, NumOfResults);
// Identify most expensive postcode Area
const housesByArea = house_data.reduce(function (acc, cur) {
  (acc[cur["Area"]] = acc[cur["Area"]] || []).push(cur);
  return acc;
}, {});
console.log(housesByArea);
