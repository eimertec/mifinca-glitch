const logModel = require('../models/logs.model')
const mailer = require('../models/mailer.model')
var fireB = require('../models/firebase-functions');

let logsController= {
    getAll: get_all,
    getLastNLogs : get_last_n_logs,
    addLog: add_log
}



function get_all(req, res, next){
    logModel.getAll( (err, result)=>{
        if (err){ 
            next(err)
        }
        else{
            res.send(result)
        }
    })

}

function get_last_n_logs(req, res, next){
    logModel.getLastNLogs(req, (err, result)=>{
        if (err){ 
            next(err)
        }
        else{
            res.send(result)
        }
    })

}

function add_log(req, res, next){
    //validation??
    /*
    logModel.addLog(req, (err, result)=>{
        if (err){ 
            console.error(err)
            // mailer.sendEmailTo("emilopez13@gmail.com", "Error in rPI", "Error in add_log: "+(err))
            next(err)
        }
        else{
            console.log('result: '+result)
            res.redirect('/logs/all')
        }
    })
    */
   res.send({
       answer: "OK",
       req: req.body
   })

   logModel.addLog(req, (err, newData)=>{
        if (err){ // Error en datos recibidos o en servidor (mysql): notificar
            console.error("error in logController: "+err)
            // mailer.sendEmailTo("emilopez13@gmail.com", "Error in rPI", "Error in add_log: "+(err))
        }
        else{ // Log agregado correctamente a mysql, actualizar firebase
            
            fireB.update_log_to_FB(newData, (fberr, fbres)=>{
                if(fberr){
                    console.error("Firebase er: "+fberr);
                    // notificar error en FB
                } 
                else{
                    console.log("Firebase OK, Result: "+ fbres)
                }
            })
            
        }
    })
   
}



module.exports = logsController;