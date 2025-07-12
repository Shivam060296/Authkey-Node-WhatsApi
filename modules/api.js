const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.post('/send-api', async (req, res) => {
    //CHECK CONSOLE EITHER THIS HIT OR NOT
    console.log('--- /send--api endpoint hit ---');
    
    //RECEIVED PARAMETERS
    const { mobileNumber, first, second, third } = req.body;

    if (!mobileNumber || !first || !second || !third) {
        return res.status(400).json({ error: 'Missing required parameters: mobileNumber, first, second, or third' });
    }
    
    //API FROM AuthKey 
    const apiUrl = 'https://console.authkey.io/restapi/requestjson.php';
    
    //BODY
    const payload = {
        country_code: process.env.COUNTRY_ID || '91',
        mobile: mobileNumber,
        wid: process.env.TEMPLATE_NAME1,
        type: 'text',
        bodyValues: {
            "1" : first,
            "2" : second,
            "3" : third,
        }
    };

    //HEADERS
    try {
        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${process.env.AUTH_KEY}`
            }
        });

        //SUCCESS RESPONSE
        return res.status(200).json({
            message: 'Message sent successfully',
            response: response.data
        });

    } catch (error) {
        const errorMsg = error.response?.data || error.message;
        //ERROR MESSAGE
        console.error('Error sending WhatsApp message:', errorMsg);
        return res.status(500).json({
            error: 'Failed to send message',
            details: errorMsg
        });
    }
});

module.exports = router;
