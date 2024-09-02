const express = require('express');
const router = express.Router();
const connection = require('../db');

router.get('/getTeam', async (req, res)=>{
    const { param } = req.body;
    try{
        connection.query("CALL teams('"+ param +"')", (err, result)=>{
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

router.put('/addTeam', async (req, res)=>{
    const param  =JSON.stringify(req.body);
    try{
        connection.query("CALL teams('"+ param +"')", (err, result)=>{
            if(err){
                res.send("Error ->" + JSON.stringify(err));
            }else{
                res.send(JSON.stringify(result[0][0]));
            }
        })
    }
    catch(err){
        res.send("Error ->" + JSON.stringify(err));
    }
});

router.put('/addTeamMem', async (req, res)=>{
    const param  =JSON.stringify(req.body);
    try{
        connection.query("CALL teams('"+ param +"')", (err, result)=>{
            if(err){
                res.send("Error ->" + JSON.stringify(err));
            }else{
                res.send(JSON.stringify(result[0][0]));
            }
        })
    }
    catch(err){
        res.send("Error ->" + JSON.stringify(err));
    }
});

module.exports = router;