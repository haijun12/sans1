const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser"); 

router.use(bodyParser.json());

router.post('/')
router.get('/users', (req, res) => {
    console.log("hi")
    // const userData = [{"hello" : 1}]
    // res.send(userData)
    res.json({ name: "Bill", age: 99})
})

module.exports = router