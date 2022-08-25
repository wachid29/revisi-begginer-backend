const postgre = require("pg").Pool;
const { Pool } = require("pg/lib");
require("dotenv").config();
//CREATE ROLE wachid29 WITH LOGIN PASSWORD 'pasword';

const connection = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT2,
});

// //export module biar bisa digunakan ditempat lain
module.exports = connection;
