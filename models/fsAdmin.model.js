const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase/serviceAccountKey.json');
const config = require('../config/configuration')

const fs_path = config.fs_path;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

const uid = "meGYwD4PSyU0eHHxGPuSqGG00sH3";
const additionalClaims = {
    proyecto: "lasArabias"
}


let firestoreModel = {}

firestoreModel.createToken = function(){
    
    admin.auth().createCustomToken(uid, additionalClaims)
    .then((customToken)=>{
        console.log('Custom Token: '+ customToken)
    })
    .catch((err)=>{
        console.log('Error creating Custom Token :' +err)
    })
}

firestoreModel.updateLog = function(sensor_id, data, cb_fn){
    const sensor = "sensor0"+sensor_id;
    db.collection(fs_path+"/sensoresTemp").doc(sensor).update(data)
    .then(()=>{
        cb_fn(null, "FireStore updated");
    })
    .catch((err) =>{
        cb_fn(err, null);
    })
}


module.exports = firestoreModel;