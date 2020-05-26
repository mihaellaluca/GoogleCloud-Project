// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");

var serviceAccount = require("./astral-bit-278316-firebase-adminsdk-aku9f-4152511685.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://astral-bit-278316.firebaseio.com/",
});
const db = admin.firestore();

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     const original = req.query.text;
//     // Push the new message into Cloud Firestore using the Firebase Admin SDK.
//     const writeResult = await db.collection("users").add({ name: "Karenina" });
//     res.json({
//         result: `Userfirebase emulators:s with ID: ${writeResult.id} added.`,
//     });
// });

exports.getRestaurants = functions.https.onRequest(async (req, res) => {
    const original = req.query.text;
    const restaurants = await db
        .collection("restaurants")
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                console.log("No matching documents.");
                return;
            }

            var allRestaurants = {};
            snapshot.forEach((doc) => {
                let iid = doc.id;
                let data = doc.data();
                allRestaurants[iid] = data;
            });

            res.json(allRestaurants);
            res.end();
            return;
        })
        .catch((err) => {
            console.log("Error getting documents", err);
        });
});
