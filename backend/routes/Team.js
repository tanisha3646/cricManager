const express = require('express');
const router = express.Router();
const connection = require('../db');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const JWT_SECRET = 'TANISHACricManagerV123456789';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/'; 
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); 
        }
        cb(null, uploadDir);  
    },
    filename: (req, file, cb) => {
        if (req.logoPath) {
            cb(null, req.logoPath);  
        } else {
            const ext = path.extname(file.originalname);
            cb(null, 'temp' + ext); 
        }
    }
});
  
const upload = multer({ storage });

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

router.put('/addTeam', upload.single('image'), async (req, res)=>{
    const param = JSON.parse(req.body.det);
    const authHeader = req.headers.authorization;  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("No token provided or invalid format");
    }
    const token = authHeader.split(' ')[1]; 
    const decoded = jwt.verify(token, JWT_SECRET);
    const usrId = decoded.id;
    param.usrId = usrId;
    param.actNo = 1;
    param.logo = req.file ? req.file.filename : '';
    const paramStr = JSON.stringify(param);
    
    try {
        connection.query("CALL teams(?)", [paramStr], (err, result) => {
            if(err){
                res.send("Error ->" + JSON.stringify(err));
            }else{
                const logo = result[0][0].logo; 
                req.logoPath = path.basename(logo);
                
                if (req.file) {
                    const oldPath = req.file.path; 
                    const newPath = path.join('./uploads/', req.logoPath);  
                    
                    fs.rename(oldPath, newPath, (err) => {
                        if (err) {
                            console.error('Error renaming file:', err);
                            return res.status(500).send('Error uploading image');
                        }
                        console.log('File uploaded successfully:', newPath);
                    });
                }
                if(result[0][1])                    
                    res.send(JSON.stringify(result[0][1]));
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