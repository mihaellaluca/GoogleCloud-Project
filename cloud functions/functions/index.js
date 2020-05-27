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
const cors = require("cors")({ origin: true });
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

exports.getUserbyEmail = functions.https.onRequest(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const userEmail = req.params[0].split("/")[1];
    console.log("userId:", userEmail);
    const users = await db
        .collection("users")
        .where("email", "==", userEmail)
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


exports.getNearestUsers = functions.https.onRequest(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const userId = req.params[0].split("/")[1];
    let myCoo;
   
    const request = req.body;
        const users = await db
        .collection("users")
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
                console.log("No matching documents.");
                return;
            }
            snapshot.forEach((doc) => {
                let iid = doc.id;
                let data = doc.data();
                if (iid === userId){
                    myCoo = data.center;
                }
            });

            var allUsers = {};
            snapshot.forEach((doc) => {
                let iid = doc.id;
                let data = doc.data();
                    if (data.center !== undefined) {
                        console.log('mycoo',myCoo);
                        let lat1 = data.center.lat;
                        let lat2 = myCoo.lat;
                        let lon1 = data.center.lng;
                        let lon2 = myCoo.lng;

                        console.log('coo',lat1, lat2,lon1, lon2);

                        var radlat1 = Math.PI * lat1/180;
                        var radlat2 = Math.PI * lat2/180;
                        var theta = lon1-lon2;
                        var radtheta = Math.PI * theta/180;
                        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                        if (dist > 1) {
                            dist = 1;
                        }
                        dist = Math.acos(dist);
                        dist = dist * 180/Math.PI;
                        dist = dist * 60 * 1.1515;
                        dist = dist * 1.609344 
                    
                        console.log('distanta',dist);
                        if ((dist < 10) && (iid !== userId)){
                            allUsers[iid] = data;
                        }
                    
                    }

                
            });
            console.log('ceva',allUsers);
            res.json(allUsers);
            res.end();
            return;
        })
        .catch((err) => {
            console.log("Error getting documents", err);
        });
});



exports.sendMailToRestaurant = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const request = JSON.parse(req.body);
    console.log(request.name, request.interval);
    var message = {
        html: `Hello, partner! \n A reservation has been made from ${request.name} at your restaurant in the interval ${request.interval}. \n Our clients can't wait to be there! \n FoodTalk TEAM `,
        subject: `FoodTalk Reservation`,
        text: ``,
    };
    var to = request.email[0];
    var data = {
        message: message,
        to: to,
    };
    console.log("DATA", data);
    const mail = await db.collection("mail").add(data);
    res.json("ok");
    res.end();
});
