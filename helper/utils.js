const jsonData = require("../clinical_data.json");
const { parseISO, addMinutes } = require("date-fns");

async function transformHeartRateData() {
  const heart_rates = jsonData.clinical_data;
  jsonData.clinical_data.HEART_RATE.data = groupByInterval(
    heart_rates.HEART_RATE
  );
  return jsonData;
}

/*
  @param heart_rate
  @return aggregate min and max heart rate for every 15 minutes. Also, include fromDate & toDate as json object
  */
function groupByInterval(heart_rate) {
  const processedHeartRate = [];
  const data = heart_rate.data;
  const intervalMinutes = 15;
  const groupedData = {};

  data.forEach((item) => {
    const date = new Date(item.on_date);
    const roundedDate = roundInterval(date, intervalMinutes);
    const key = roundedDate.toISOString();

    if (!groupedData[key]) {
      groupedData[key] = [];
    }
    groupedData[key].push(item);
  });

  Object.keys(groupedData).forEach((key) => {
    const data = groupedData[key];
    const heartRateObj = data.reduce(
      (acc, item) => {
        if (item.measurement < acc.measurement.min) {
          acc.measurement.min = item.measurement;
        }
        if (item.measurement > acc.measurement.max) {
          acc.measurement.max = item.measurement;
        }
        return acc;
      },
      { measurement: { min: Infinity, max: -Infinity } }
    );

    //Parses the ISO 8601 string to a JavaScript Date object
    const fromDate = parseISO(key);
    //Adds 15 minutes to the start date to determine the end date
    const toDate = addMinutes(fromDate, 15);
    heartRateObj.from_date = fromDate;
    heartRateObj.to_date = toDate;
    processedHeartRate.push(heartRateObj);
  });

  return processedHeartRate;
}

/*
@param date
@param intervalMinutes
This function rounds a given date to the nearest interval in minutes. The Math.floor function ensures 
that the timestamp is rounded down to the nearest interval.
*/
function roundInterval(date, intervalMinutes) {
  const ms = intervalMinutes * 60 * 1000;
  return new Date(Math.floor(date.getTime() / ms) * ms);
}

module.exports = { transformHeartRateData };
