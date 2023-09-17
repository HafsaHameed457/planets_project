import { parse } from "csv-parse";
import fs from "fs";
let file_data = [];

fs.createReadStream("kepler_Data.csv")
  .pipe(parse({ comment: "#", columns: true }))
  .on("data", (data) => {
    file_data.push(data);
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(file_data);
  });
