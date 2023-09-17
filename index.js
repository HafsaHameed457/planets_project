import { parse } from "csv-parse";
import fs from "fs";
let habitatable_Planets = [];

function isHabitatable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
fs.createReadStream("kepler_Data.csv")
  .pipe(parse({ comment: "#", columns: true }))
  .on("data", (data) => {
    if (isHabitatable(data)) {
      habitatable_Planets.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(habitatable_Planets.map((planet) => planet.kepoi_name));
  });
