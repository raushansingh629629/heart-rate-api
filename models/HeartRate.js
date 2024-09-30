const { DataTypes } = require('sequelize');
const sequelize = require('../helper/database');

// Define the HeartRate model
const HeartRate = sequelize.define('HeartRate', {
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    heart_rate: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    weight: {
      type: DataTypes.JSONB
    },
    blood_glucose_level: {
      type: DataTypes.JSONB
    },
    steps: {
      type: DataTypes.JSONB,
    }
    // Add other metrics here if needed
  }, {
    timestamps: true,
  });

  module.exports = HeartRate;