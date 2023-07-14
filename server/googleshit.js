// const { MongoClient , GridFSBucket} = require("mongodb");
fs = require('fs');
// // Replace the uri string with your connection string.
// const client = new MongoClient(process.env.DB_URI);

// async function run() {
//   try {
//     const database = client.db('avatars');
//     const bucket = new GridFSBucket(database);
//     // const bucket = new mongodb.GridFSBucket(db, { bucketName: 'myCustomBucket' });
//     fs.createReadStream('./paris_basic.obj').
//      pipe(bucket.openUploadStream('paris_basic'));

//     bucket.openDownloadStreamByName('paris_basic').
//      pipe(fs.createWriteStream('./outputFile'));
//     const movies = database.collection('males');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { name: 'haijun' };
//     const movie = await movies.findOne(query);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
const path = require("path");


// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html


// Creates a client from a Google service account key
const storage = new Storage({
    keyFilename: path.join(__dirname, "../client/elated-card-344103-604b30672527.json")
    // projectId: 'elated-card-344103'
});

// gc.getBuckets().then(x => console.log(x));
// const bucket = gc.bucket('san_avatars');
// console.log("logging bucket")
// console.log(bucket)
const bucketName = 'san_avatars'
const fileName = 'paris_basic/paris_basic.mtl'
//   async function downloadFile() {
//     const options = {
//       destination: 'test1.mtl',
//     };
//     // const options = {
//     //   destination: destFileName,
//     // };

//     // Downloads the file
//     await storage.bucket(bucketName).file(fileName).download(options);

//     console.log(
//       `gs://${bucketName}/${fileName} downloaded to.`
//     );
//   }

// downloadFile().catch(console.error);
// The ID of the bucket the original file is in
//   const srcBucketName = 'san_avatars';

//   // The ID of the GCS file to copy
//   const srcFilename = 'paris_basic/paris_basic.mtl';

//   // The ID of the bucket to copy the file to
//   const destBucketName = 'sans_male_avatars';

//   // The ID of the GCS file to create
//   const destFileName = 'test1.pdf';
// async function copyFile() {
//     const copyDestination = storage.bucket(destBucketName).file(destFileName);

//     // Optional:
//     // Set a generation-match precondition to avoid potential race conditions
//     // and data corruptions. The request to copy is aborted if the object's
//     // generation number does not match your precondition. For a destination
//     // object that does not yet exist, set the ifGenerationMatch precondition to 0
//     // If the destination object already exists in your bucket, set instead a
//     // generation-match precondition using its generation number.
//     const copyOptions = {
//       // preconditionOpts: {
//       //   ifGenerationMatch: destinationGenerationMatchPrecondition,
//       // },
//     };

//     // Copies the file to the other bucket
//     await storage
//       .bucket(srcBucketName)
//       .file(srcFilename)
//       .copy(copyDestination, copyOptions);

//     console.log(
//       `gs://${srcBucketName}/${srcFilename} copied to gs://${destBucketName}/${destFileName}`
//     );
//   }

//   copyFile().catch(console.error);
destFileName = "text1.txt"
async function streamFileDownload() {
  // The example below demonstrates how we can reference a remote file, then
  // pipe its contents to a local file.
  // Once the stream is created, the data can be piped anywhere (process, sdout, etc)
  await storage
    .bucket(bucketName)
    .file(fileName)
    .createReadStream() //stream is created
    .pipe(fs.createWriteStream(destFileName))
    .on('finish', () => {
      // The file download is complete
    });

  console.log(
    `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
  );
}
streamFileDownload().catch(console.error);
// const resolvers = {
//   Query: {
//     files: () => files
//   },
//   Mutation: {
//     uploadFile: async (_, { file }) => {
//       const { createReadStream, filename } = await file;

//       await new Promise(res =>
//         createReadStream()
//           .pipe(
//             coolFilesBucket.file(filename).createWriteStream({
//               resumable: false,
//               gzip: true
//             })
//           )
//           .on("finish", res)
//       );

//       files.push(filename);

//       return true;
//     }
//   }
// };

// const [files] = gc.bucket("san_avatars").getFiles();

// console.log('Files:');
//   files.forEach(file => {
//     console.log(file.name);
//   });



/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'san-avatars';

// async function createBucket() {
//   // Creates the new bucket
//   await storage.createBucket(bucketName);
//   console.log(`Bucket ${bucketName} created.`);
// }

// createBucket().catch(console.error);