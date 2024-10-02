const express = require('express');
const router = express.Router();
const connection = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'TANISHACricManagerV123456789';

router.get('/getTeam', async (req, res)=>{
    const param = JSON.parse(req.query.det);
    const authHeader = req.headers.authorization;  
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("No token provided or invalid format");
    }    
    try{        
        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, JWT_SECRET);
        const usrId = decoded.id;
        param.usrId = usrId;
        param.actNo = 2;
        
        const paramStr = JSON.stringify(param);
        
        connection.query("CALL teams(?)", [paramStr], (err, result) => {
            if(err){
                res.send("Error ->" + JSON.stringify(err));
            }else{
                if(result[0])
                    res.send(JSON.stringify(result[0]));
            }
        })
    }
    catch(err){
        res.send("Error ->" + JSON.stringify(err));
    }
});

router.put('/addTeam', async (req, res)=>{
    const param = req.body
    const authHeader = req.headers.authorization;  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("No token provided or invalid format");
    }
    const token = authHeader.split(' ')[1]; 
    const decoded = jwt.verify(token, JWT_SECRET);
    const usrId = decoded.id;
    param.usrId = usrId;
    param.actNo = 1;
    param.teamId = 0;
    const paramStr = JSON.stringify(param);

    try {
        connection.query("CALL teams(?)", [paramStr], (err, result) => {
            if(err){
                res.send("Error ->" + JSON.stringify(err));
            }else{
                if(result[0])                    
                    res.send(JSON.stringify(result[0]));
            }
        })
    }
    catch(err){
        res.send("Error ->" + JSON.stringify(err));
    }
});

router.post('/addTeamMem', async (req, res)=>{
    const param = req.body
    const authHeader = req.headers.authorization;  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("No token provided or invalid format");
    }
    const token = authHeader.split(' ')[1]; 
    const decoded = jwt.verify(token, JWT_SECRET);
    const usrId = decoded.id;
    param.usrId = usrId;
    param.actNo = 3;
    const paramStr = JSON.stringify(param);
    
    try {
        connection.query("CALL teams(?)", [paramStr], (err, result) => {
            if(err){
                res.send("Error ->" + JSON.stringify(err));
            }else{
                if(result[0])
                    res.send(JSON.stringify(result[0]));
            }
        })
    }
    catch(err){
        res.send("Error ->" + JSON.stringify(err));
    }
});

router.get('/getTeamMem', async (req, res)=>{    
    const param = JSON.parse(req.query.det);
    const authHeader = req.headers.authorization;  
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("No token provided or invalid format");
    }    
    try{        
        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, JWT_SECRET);
        const usrId = decoded.id;
        param.usrId = usrId;
        param.actNo = 4;
        
        const paramStr = JSON.stringify(param);
        
        connection.query("CALL teams(?)", [paramStr], (err, result) => {
            if(err){
                res.send("Error ->" + JSON.stringify(err));
            }else{
                if(result[0])
                    res.send(JSON.stringify(result[0]));
            }
        })
    }
    catch(err){
        res.send("Error ->" + JSON.stringify(err));
    }
});

router.delete('/delTeamMem', async (req, res)=>{    
    const param = req.body
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("No token provided or invalid format");
    }    
    try{        
        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, JWT_SECRET);
        const usrId = decoded.id;
        param.usrId = usrId;
        param.actNo = 5;
        
        const paramStr = JSON.stringify(param);
       console.log(paramStr)
        connection.query("CALL teams(?)", [paramStr], (err, result) => {
            if(err){
                res.send("Error ->" + JSON.stringify(err));
            }else{
                if(result[0])
                    res.send(JSON.stringify(result[0]));
            }
        })
    }
    catch(err){
        res.send("Error ->" + JSON.stringify(err));
    }
});

module.exports = router;