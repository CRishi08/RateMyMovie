const result = require('../utils/result')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
function authorization(req, res, next) {
  if (req.url == '/user/register' || req.url == '/user/login' || req.url == '/movies/get') {
    next()
  }
  else {
    const token = req.headers.token
    if (token) {
      try {
        const payload = jwt.verify(token, config.secret)
        console.log("payload:", payload)
        req.headers.user_id = payload.user_id
        console.log(req.headers.user_id)
        console.log("payload.user_id:", payload.user_id)
        req.user_id = payload.user_id
      }
      catch (e) {
        res.send(result.createErrorResult("Invalid Token"))
      }
    }
    else {
      res.send(result.createErrorResult("token is missing"))
    }

  }
}

module.exports = authorization