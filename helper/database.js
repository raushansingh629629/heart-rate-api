const { Sequelize } = require('sequelize');

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize('monitor_heart_rate_db', 'testuser', 'xxxx', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;