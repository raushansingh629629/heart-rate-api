const express = require("express");
const router = express.Router();
const { transformHeartRateData } = require("../helper/utils");
const HeartRate = require("../models/HeartRate");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* 
GET & process heart_rate data.
Here, reading .json file so using GET instead of POST to return processed data.
 */
router.get("/caremonitor/heartrate", async function (req, res, next) {
  const processedData = await transformHeartRateData();

  /*
  Storing few fields directly in json form for POC purpose as details are not provided, what exactly have to store.
  Uncomment below portion of code to store data in postgresql in json form.
  */
  /*try {
    // Create a new record with JSON data
    await HeartRate.create({
      timestamp: new Date(),
      heart_rate: processedData.clinical_data.HEART_RATE,
      weight: processedData.weight,
      blood_glucose_level: processedData.blood_glucose_level,
      steps: processedData.steps
    });
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  }*/

  return res.status(200).json(processedData);
});

module.exports = router;
