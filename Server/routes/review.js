const express = require('express')
const router = express.Router()
const result = require('../utils/result')
const pool = require('../db/db')

router.post('/add', (req, res) => {
    const { movie_id, rating, review, user_id } = req.body
    const sql = `insert into reviews(movie_id,rating,review,user_id) values(?,?,?,?)`
    pool.query(sql, [movie_id, rating, review, user_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})


router.get('/get', (req, res) => {
    const sql = `select movies.title,reviews.review_id,reviews.movie_id,reviews.rating,movies.release_date,reviews.LastUpdatedDate,reviews.review from movies,reviews where movies.movie_id=reviews.movie_id`
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.delete('/delete', (req, res) => {

    const sql = `delete from reviews where review_id=?`
    pool.query(sql, [req.headers.review_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.put('/edit', (req, res) => {
    const { rating, review, review_id } = req.body
    const sql = `update reviews set rating=?,review=? where review_id=?`
    pool.query(sql, [rating, review, review_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.get('/byme', (req, res) => {
    console.log(req.headers.user_id)
    const sql = `select reviews.review_id,movies.movie_id,reviews.review,reviews.rating,reviews.LastUpdatedDate,movies.title from reviews,movies where reviews.movie_id = movies.movie_id && user_id=?`
    pool.query(sql, [req.headers.user_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.delete('/bymedelete', (req, res) => {
    const sql = `delete from reviews where review_id=?`
    pool.query(sql, [req.headers.review_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})
module.exports = router