const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const {collection,
  where,
  query,
  getDocs,
} = require("firebase/firestore");


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getColour = functions.https.onCall((data, context) => {
  return new Promise(function(resolve, reject) {
    const email = data.email;
    console.log("I have been run");
    console.log("email: ", email);
    const q = query(collection(admin.firestore(), "colours"),
        where("email", "==", email));
    const querySnapshot = getDocs(q);
    resolve(querySnapshot[0].colours);
  });
});


exports.setColour = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log("test 1 ");
  const email = req.query.email;
  const colours = req.query.colours;
  console.log("colours: ", colours);
  console.log("email: ", email);
  const colourArray = colours.split(" ");
  console.log(colourArray);
  const obj = JSON.parse(colourArray[0]);
  console.log(obj);
  admin.firestore().collection("colours").where("email", "==", email)
  .get().then((snapshot) => {
    admin.firestore().collection("colours").doc(snapshot.docs[0].id).update({"colours": obj});
    res.send("ok");
  });
});
