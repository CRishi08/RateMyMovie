const express = require('express')
const router = express.Router()
const pool = require('../db/db')
const result = require('../utils/result')

router.get('/get', (req, res) => {
    const sql = `select *from movies`
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router