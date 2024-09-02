const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '13.201.250.192',
    port: 3306,
    database: 'cricMng',
    user: 'root',
    password: 'gymapp2024!'
});

const connectToDb = ()=>{
    connection.connect((err)=>{
        if(err){
            console.log('An error occured ->', err);
        }
        else{
            console.log('connection created')
        }
    });
};
connectToDb();
module.exports = connection;