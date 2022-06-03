
const {connect} = require("rethinkdb")
const { dbHost, dbNm, dbPort } = require("../config")

const DB = connect({
    host:dbHost,
    db:dbNm,
    port:dbPort
})

module.exports ={DB}