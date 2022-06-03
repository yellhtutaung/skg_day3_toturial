const {config} = require('dotenv')

const serverPort = process.env.serverPort || 4000;
const dbPort = process.env.dbPort || "28015";
const dbNm = process.env.dbNm || 'test';
const dbHost = process.env.dbHost || 'localhost';
const jwtSecret = process.env.jwtSecret || "jwtSecret"

module.exports ={serverPort,dbPort,dbNm,jwtSecret,dbHost}