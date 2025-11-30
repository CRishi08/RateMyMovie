const express = require('express')
const router = express.Router()
const pool = require('../db/db')
const result = require('../utils/result')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const saltRounds = 10
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, birthday, mobile } = req.body
    const sql = `insert into users (first_name,last_name,email,password,birthday,mobile) values(?,?,?,?,?,?)`;
    const hashPassword = await bcrypt.hash(password, saltRounds)
    pool.query(sql, [first_name, last_name, email, hashPassword, birthday, mobile], (error, data) => {
        res.send(result.createResult(error, data))
        console.log(res);
        console.log(error);
    })
})


router.post('/login', (req, res) => {
    const { email, password } = req.body
    const sql = `select * from users where email=?`
    pool.query(sql, [email], async (error, data) => {
        if (data != '') {
            console.log(data[0])
            const user = data[0]
            const result1 = await bcrypt.compare(password, user.password)
            console.log("result:", result1)
            if (result1) {
                const payload = {
                    user_id: user.user_id
                }
                const token = await jwt.sign(payload, config.secret)
                const body = {
                    'token': token,
                    'email': user.email,
                    'first_name': user.first_name,
                    'user_id': user.user_id

                }
                res.send(result.createResult(error, body))
            }
            else {
                res.send(result.createErrorResult("Invalid Password"))
            }
        }
        else {
            res.send(result.createErrorResult("Invalid email"))
        }
    })
})


router.put('/edit', (req, res) => {
    const { first_name, last_name, email, birthday, mobile } = req.body
    const sql = `update users set first_name=? , last_name =? ,email=? , birthday=? ,mobile=? where user_id=?`
    pool.query(sql, [first_name, last_name, email, birthday, mobile, req.headers.user_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.put('/password', (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body
        const sql = 'select * from users where user_id=?'
        console.log(req.headers.user_id)
        pool.query(sql, [req.headers.user_id], async (error, data) => {
            if (data != '') {
                const user = data[0]
                console.log("UserData:", user)
                const isTrue = await bcrypt.compare(currentPassword, user.password)
                console.log("Promise", isTrue)
                if (isTrue) {
                    const sql1 = `update users set password=? where user_id=?`
                    const hash = await bcrypt.hash(newPassword, saltRounds)
                    pool.query(sql1, [hash, req.headers.user_id], (error, data) => {
                        res.send(result.createResult(error, data))
                    })
                }
                else {
                    res.send(result.createErrorResult("Invalid Password"))
                }
            }
            else {
                res.send(result.createErrorResult("Invalid user"))
            }
        })


    }
    catch (error) {
        console.log(error)
    }
})
module.exports = router