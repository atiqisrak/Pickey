const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blogger",
  password: "4862",
  port: 5432,
});

module.exports = pool;

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("blogger", "postgres", "4862", {
//   host: "localhost",
//   dialect: "postgres",
// });

// module.exports = sequelize;
