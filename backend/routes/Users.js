const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const connection = require('../db'); 

const JWT_SECRET = 'TANISHACricManagerV123456789';
const hashMobileNumber = (mobTel) => {
    return crypto.createHash('sha256').update(mobTel).digest('hex');
};

router.post('/login', async (req, res) => {
    const param = req.body;
    if (!param || !param.mobTel) {
        return res.status(400).json({ error: 'Mobile number is required' });
    }
    const mobTel  = param.mobTel;

    try {
        const hashedMobTel = hashMobileNumber(mobTel);
        param.mobTel = hashedMobTel;

        connection.query("CALL users(?)", [JSON.stringify(param)], async (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error', details: err });
            }
            console.log(result);
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

module.exports = router;
