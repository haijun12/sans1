const express = require("express")
// access server in different domains
const cors = require("cors")
// used for posts
const bodyParser = require("body-parser")
const router = require('./routes/router')
const mongoose = require('mongoose')
require('dotenv/config')
const multer = require("multer");
const {Storage} = require('@google-cloud/storage');
const path = require("path");
fs = require('fs');

const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());
app.use(express.json());

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.get("/users", (req, res) => {
    // res.json({ message: "Bill", age: 99})
    // Creates a client from a Google service account key
    const storage = new Storage({
      keyFilename: path.join(__dirname, "../client/elated-card-344103-604b30672527.json")
    });
    
    const bucketName = 'san_avatars'
    const fileName = 'paris_basic/paris_basic.obj'
    const destFileName = "helo";
  async function streamFileDownload() {
    // The example below demonstrates how we can reference a remote file, then
    // pipe its contents to a local file.
    // Once the stream is created, the data can be piped anywhere (process, sdout, etc)
    await storage
      .bucket(bucketName)
      .file(fileName)
      .createReadStream() //stream is created
      .pipe(res)
      .on('finish', () => {
        console.log("finished!")
        // The file download is complete
      })
    // console.log(res.json())
    console.log(
      `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
    );

    // console.log(destFileName),
  }
  streamFileDownload().catch(console.error);
})
// app.use(cors(corsOptions))
// app.use('/', router)

 
// //to parse json content
// app.use(express.json());
// //to parse body from url
// app.use(express.urlencoded({
//   extended: false
// }));



const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})