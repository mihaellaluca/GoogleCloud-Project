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

exports.getRestaurants = functions.https.onRequest(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
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

exports.getUserbyId = functions.https.onRequest(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const userId = req.params[0].split("/")[1];
    console.log("userId:", userId);
    const users = await db
        .collection("users")
        .where("uid", "==", userId)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                console.log("No matching documents.");
                return;
            }
            var user = {};
            snapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data());
                user[doc.id] = doc.data();
            });

            res.json(user);
            res.end();
            return;
        })
        .catch((err) => {
            console.log("Error getting documents", err);
        });
});

exports.modifyProfile = functions.https.onRequest(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const userId = req.params[0].split("/")[1];
    const request = req.body;
    var prefRestaurant = request.prefRestaurant;
    var prefSpecific = request.prefSpecific;
    var prefFood = request.prefFood;
    const users = await db
        .collection("users")
        .where("uid", "==", userId)
        .get()
        .then((snapshot) => {
            var user = snapshot.docs[0];
            if (prefRestaurant.length) {
                user.ref.update({ prefRestaurants: prefRestaurant });
            }
            if (prefSpecific.length) {
                user.ref.update({ prefSpecific: prefSpecific });
            }
            if (prefFood.length) {
                user.ref.update({ prefFood: prefFood });
            }
            res.json("ok");
            res.end();
            return;
        })
        .catch((err) => {
            console.log("Error getting documents", err);
        });
});



exports.sendMailToRestaurant = functions.https.onRequest(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const request = req.body;
    var message = {
        html: `Hello, partner! \n A reservation has been made from ${request.name} at your restaurant in the interval ${request.interval}. \n Our clients can't wait to be there! \n FoodTalk TEAM `,
        subject: `FoodTalk Reservation`,
        text: ``,
    };
    var to = request.email;
    var data = {
        message: message,
        to: to,
    };
    const mail = await db.collection("mail").add(data);

    res.json("ok");
    res.end();
    return;
});
