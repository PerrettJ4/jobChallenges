const house_json = require("./House_List.json");

function getHouseResults(houseJson) {
  const houseData = houseJson.map((house) => {
    // reshaping the data to include Postal Area Code
    const area = house.Postcode.split(" ")[0];
    // converging Price columns 3, 4 & 5 together (removing anything that is not a digit or a .)
    const priceStr =
      house.Price.replace(/[^\d|^\.]/gi, "") + house.field4 + house.field5;
    const price = +priceStr.replace(/.00|undefined/gi, "");
    return {
      address: house.Address,
      postcode: house.Postcode,
      area,
      price,
    };
  });

  // Sort functions
  const byKeyAsc = (key) => (a, b) => a[key] - b[key];
  const byKeyDesc = (key) => (a, b) => b[key] - a[key];

  // The most expensive
  const mostExpensiveHouses = (NumOfResults) =>
    houseData.sort(byKeyDesc("price")).slice(0, NumOfResults);

  // The cheapest
  const cheapestHouses = (NumOfResults) =>
    houseData.sort(byKeyAsc("price")).slice(0, NumOfResults);

  // Identify most expensive postcode Area
  // Grouping by Area
  const houseDataByAreaObj = houseData.reduce(function (acc, cur) {
    (acc[cur["area"]] = acc[cur["area"]] || []).push(cur);
    return acc;
  }, {});
  const houseDataByAreaArray = Object.values(houseDataByAreaObj);

  // Shaping the data into an Array of Area Objects
  const avgPriceByAreaArray = houseDataByAreaArray.map((properties) => {
    const num_of_properties = properties.length;
    const avg_price =
      properties.reduce((acc, cur) => acc + cur.price, 0) / num_of_properties;
    const area = properties[0].area;
    return {
      area,
      avg_price,
      num_of_properties,
      properties,
    };
  });

  // The most expensive Area
  const mostExpensiveArea = avgPriceByAreaArray.sort(byKeyDesc("avg_price"))[0];

  return {
    mostExpensiveHouses,
    //  Array of Objects with NumOfResults argument
    cheapestHouses,
    //  Array of Objects with NumOfResults argument
    mostExpensiveArea,
    //  Object
    houseData,
    //  raw packaged data in Array
    houseDataByAreaObj,
    //  Object where houses grouped by key - Area code
    houseDataByAreaArray,
    //  Nested array, grouped by Area code
    avgPriceByAreaArray,
    // Array of Area Objects e.g:
    //   ,{
    //     area: 'TA7',
    //     avg_price: 232617,
    //     num_of_properties: 1,
    //     properties: [ [Object] ]
    //   },
  };
}

console.log(getHouseResults(house_json));
