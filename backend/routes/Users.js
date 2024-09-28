const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const connection = require('../db'); 

const JWT_SECRET = 'TANISHACricManagerV123456789';
// const hashMobileNumber = (mobTel) => {
//     return crypto.createHash('sha256').update(mobTel).digest('hex');
// };

router.post('/login', async (req, res) => {
    const param = req.body;
    if (!param || !param.mobTel) {
        return res.status(400).json({ error: 'Mobile number is required' });
    }
    const mobTel  = param.mobTel;

    try {
        // const hashedMobTel = hashMobileNumber(mobTel);
        // param.mobTel = hashedMobTel;
        param.actNo = 1;

        connection.query("CALL users(?)", [JSON.stringify(param)], async (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error', details: err });
            }
            const user = result[0][0];
            if (!user.mobNo) {
                return res.status(400).json({ error: 'Invalid mobile number' });
            }

            const token = jwt.sign({ id: user.usrId }, JWT_SECRET, { expiresIn: '183d' });

            res.status(200).json({token: token, typ:user.typ});
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error', details: err });
    }
});

router.get('/getMem', async (req, res)=>{
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
        // const hashedMobTel = hashMobileNumber(param.txt);
        // param.txt = hashedMobTel;        
        const paramStr = JSON.stringify(param);
        console.log(123)
        connection.query("CALL users(?)", [paramStr], (err, result) => {
            if(err){
                res.send("Error ->" + JSON.stringify(err));
            }else{                
                res.status(200).json({mem: result[0]});
            }
        })
    }
    catch(err){
        res.send("Error ->" + JSON.stringify(err));
    }
});

module.exports = router;
