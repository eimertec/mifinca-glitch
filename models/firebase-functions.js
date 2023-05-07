var firebase = require("firebase");

const config = require('../config/configuration')

var fbApp = firebase.initializeApp(config.firebaseConfig);

logged_in = false
log_in()

function log_in(){
    fbApp.auth().signInWithEmailAndPassword(config.firebaseEmail, config.firebasePassword)
        .then((credential)=>{
            logged_in = true
            console.log("FireBase Login OK")
        })
        .catch((error)=>{
            logged_in = false
            console.error('Error in Firebase Authentication: '+error)
        })
}

function log_in_and(callback){
    fbApp.auth().signInWithEmailAndPassword(config.firebaseEmail, config.firebasePassword)
        .then((credential)=>{
            logged_in = true
            console.log("FireBase Login OK")
            return callback(true)
        })
        .catch((error)=>{
            logged_in = false
            console.error('Error in Firebase Authentication: '+error)
            return callback(false)
        })
}

let fbFunctions = {
    update_log_to_FB : update_log_to_fb
}

function update_log_to_fb(newData, cb_fun){

    console.log("data to Send to FB: "+ JSON.stringify(newData))
    if (newData && newData.sensor_id && newData.values){

        const docPath = config.firebasePath+'/sensores/sensor'+newData.sensor_id
        const sensorDocumentReference = fbApp.firestore().doc(docPath)
        
        const values = newData.values;
        const newLog = {
            values,
            date: new Date()
        }
        console.log("NEW LOG: "+ JSON.stringify(newLog))
        verifyconnection_or_relogin_P()
            .then((login_result)=>{
                console.log(login_result)
                if (login_result){
                    return write_log_firestore(newLog, sensorDocumentReference)
                }
            }) 
            .then((result2)=>{
                let rtdb_newLog = {
                    sensorid: newData.sensor_id,
                    timestamp: Date.now().toString(),
                }
                for (var val in values){
                    rtdb_newLog[val] = values[val]
                }
                return write_log_rtdb(rtdb_newLog)
            })
            .then((result3)=>{
                return cb_fun(null, "FB Update OK")
            })
            .catch((err)=>{
                console.error(err)
                // return("ERROR in FB")
                return cb_fun("Error in FB", null)
            })

    }

    else{
        return cb_fun("Data Error", null)
    }
}

function verifyconnection_or_relogin_P(){
    return new Promise((resolve, reject)=>{
        if (logged_in){
            resolve('Firebase Login OK')
        }
        else log_in_and((relogin_result)=>{
            if (relogin_result){
                resolve('Firebase reLogin OK')
            }
            else reject('Firebase Login ERROR')
        })
    })
    
}

function write_log_firestore(newLog, sensorDocRef){
    return new Promise((resolve, reject)=>{
        sensorDocRef.set({ultimolog: newLog}, { merge: true }) //Si el documento no existe, se crea. Si existe, se actualiza
            .then((result)=>{
                console.log("FireBase update1 succesfull: "+ result)
                return sensorDocRef.collection("historial").add(newLog)
            })
            .then((result2)=>{
                console.log("FireBase update2 succesfull: "+ result2)
                resolve(result2)
            })
            .catch((error)=>{
                reject('Error in Firestore')
            }
        )
    })

}


function write_log_rtdb(newLog){
    return new Promise((resolve, reject)=>{

        fbApp.database().ref('logs').push(newLog)
        .then((rtdb_result)=>{
            console.log("RTDB update OK")
            resolve(rtdb_result)
        })
        .catch((err)=>{
            console.log("RTDB error")
            reject(err)
        })
    })
}



module.exports = fbFunctions;