var mongoosedb = require('./mongodb');

var Schema = mongoosedb.Schema;

var logSchema = new Schema({
    sensor_id: {type: Number, required: true},
    date: { type: Date, default: Date.now},
    values: JSON
}, {collection: 'logs'});

var logData = mongoosedb.model("log", logSchema);


let logModel = {
    //getLastNLogs : get_last_n_logs,
    addLog: add_log,
    // getAll: get_all
}
/*
function get_all(cb_fn){

   logData.find().limit(100)
   .then((data)=>{
       return cb_fn(null, data)
   })
   .catch(err => {
       return cb_fn(err, null)
   })

}

function get_last_n_logs(req, cb_fn){
    
    req.check('n', 'Valor de N no válido').isLength({min:1}).isInt({min: 0});
    const validationErrors = req.validationErrors();

    if (validationErrors){
        const er = definir_error(validationErrors)
        return cb_fn(er, null)
    }

    const N = parseInt(req.params.n);

    logData.find().sort( { date: -1 } ).limit(N)
    .then((data)=>{
        return cb_fn(null, data)
    })
    .catch(err => {
        return cb_fn(err, null)
    })
    
}
*/
function add_log(req, cb_fn){
    console.log("Req.body: "+ JSON.stringify(req.body))
    //validation?? is it necesary?
    /*
    req.check('sensor_id', 'valor de sensor ID no válido').isLength({min: 1}).isInt({min: 1});
    req.check('temperaturaH', 'valor de temperaturaH no válido').isLength({min: 1}).isFloat();
    req.check('temperaturaS', 'valor de temperaturaS no válido').isLength({min: 1}).isFloat();
    req.check('humedad', 'valor de humedad no válido').isLength({min: 1}).isFloat();
    */
    req.check('sensor_id', 'valor de sensor ID no válido').isLength({min: 1}).isInt({min: 1});
    req.check('values', 'valor de values no válido').isLength({min: 1});
    
   const validationErrors = req.validationErrors();

    if (validationErrors){
        const er = definir_error(validationErrors)
        return cb_fn(er, null)
    }

    else{

        const newData = {
            sensor_id: req.body.sensor_id,
            values: req.body.values
        }

        var data = new logData(newData);
        cb_fn(null, newData) //ESTE ES EL CAMBIAZOOOOO

        // data.save()
        // .then(result =>{
        //     console.log("Up OK"+result)
        //     cb_fn(null, newData)
        // })
        // .catch(err => {
        //     console.Error("Up"+err)
        //     cb_fn(err, null)
        // })

    }

}


function definir_error(validationErrors){
    // console.log('validation errors: '+ JSON.stringify(validationErrors))
    let er = new Error(validationErrors[0].msg);
    er.status = 400;
    er.message = JSON.stringify(validationErrors);
    return er
}

module.exports = logModel;