var mysqldb = require('./mysqldb');


let heroModel = {
    getLastNLogs : get_last_n_logs,
    addLog: add_log,
    getAll: get_all
    // modifyLog: modify_log
}

function get_all(cb_fn){
    
    mysqldb.query("select * from heroes", (err, rows, fields) =>{
        return cb_fn(err, rows)
    })

}

function get_last_n_logs(req, cb_fn){

    req.check('n', 'Valor de N no válido').isLength({min:1}).isInt({min: 0});

    const validationErrors = req.validationErrors();

    if (validationErrors){
        const er = definir_error(validationErrors)
        return cb_fn(er, null)
    }
    const queryString = "SELECT * FROM heroes "+"ORDER BY fecha DESC "+"limit "+req.params.n;
    mysqldb.query(queryString, (err, rows, fields) =>{
        return cb_fn(err, rows)
    })

}

function add_log(req, cb_fn){
    //validation??

    req.check('nombre', 'Debe introducir un nombre').isLength({min: 1});
    req.check('kills', 'Debe introducir un valor de kills').isLength({min: 1}).isFloat();

    const validationErrors = req.validationErrors();

    if (validationErrors){
        const er = definir_error(validationErrors)
        return cb_fn(er, null)
    }

    else{
        console.log('Query: '+req.body.nombre+req.body.kills)
        mysqldb.query("insert into heroes (nombre, kills) values (? , ?)", [req.body.nombre,  req.body.kills], (err, result, fields)=>{
            cb_fn(err, result)
        });
    }

}


function definir_error(validationErrors){
    // console.log('validation errors: '+ JSON.stringify(validationErrors))
    let er = new Error(validationErrors[0].msg);
    er.status = 400;
    er.message = JSON.stringify(validationErrors);
    return er
}

module.exports = heroModel;