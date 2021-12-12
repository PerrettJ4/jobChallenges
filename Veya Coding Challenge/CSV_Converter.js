const csv = require("csvtojson");
const fs = require("fs");
const csvFilePath = "./House_List.csv";

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log(jsonObj);

    fs.writeFileSync(
      "House_List.json",
      JSON.stringify(jsonObj),
      "utf-8",
      (err) => {
        if (err) console.log(err);
      }
    );
  });
