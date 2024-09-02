const express = require('express');
const router = express.Router();
const connection = require('../db');

router.get('/getTour', async (req, res)=>{
    const { param } = req.body;
    try{
        connection.query("CALL fetchTeam('"+ param +"')", (err, result)=>{
            if(err){
                res.send("Error ->" + JSON.stringify(err));
            }else{
                res.send(JSON.stringify(result[0]));
            }
        })
    }
    catch(err){
        res.send("Error ->" + JSON.stringify(err));
    }
});


module.exports = router;