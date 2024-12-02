var admin = require("firebase-admin");

var serviceAccount = require("../config/itable-app-firebase-adminsdk-bdx2l-b72fed8fea.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://itable-app-default-rtdb.firebaseio.com"
});
console.log("Conectado ao Firebase!");

const db = admin.database();

module.exports = db;
