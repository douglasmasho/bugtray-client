const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().someservice.key;

const sgMail = require("@sendgrid/mail");///require sgMail
sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore.document("/bugs/{bugID}")
.onCreate((snap,context)=>{
    const bugID = context.params.bugID;

    console.log(bugID)
    const db = admin.firestore();

    return db.collection("bugs").doc(bugID).get().then(doc=>{
        const bug = doc.data();


        const msg = {
            to: "douglasmasho@gmail.com",
            from:"bugtrayapp@gmail.com",
            subject: "Wassup mah ninja",

            templateId: "d-7e25e6a0ed2a4be9ac87747585d7ae83",
            substitutions: {
                name: bug.author
            }
        }

        return sgMail.send(msg)
    }).then(()=>{
        console.log("Email sent!")
    }).catch(e=>console.log(e))


})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
