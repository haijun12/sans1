const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema ({
    name: {type: String, required:true},
    entryDate: {type.Date, default:Date.now}
})

const Males = mongoose.model('Males', userSchema, 'males')
const mySchemas = {'Males': Males}

module.exports = mySchemas