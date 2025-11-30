const mysql=require('mysql2')
const pool=mysql.createPool({
    host:'localhost',
    user:'D5-92662-Rishi',
    password:'manager',
    database:'hackathon'
    

})
module.exports=pool