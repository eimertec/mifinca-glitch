
const config = require('../../config/configuration')

const cp = require('child_process');

const exec_string = 'mysql -u '+config.db_user+' -p'+config.db_password+' <'+config.db_script;

cp.exec(exec_string, (error, stdout, stderr) => {
    if (error) throw error;
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});
