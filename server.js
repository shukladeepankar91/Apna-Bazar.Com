const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Root Test Route (Server status check karne ke liye)
app.get('/', (req, res) => {
    res.send('Apna Bazar WhatsApp OTP Backend is Live! 🚀');
});

// Meta Credentials
const TOKEN = 'EAA7tc4gMFJIBSi3APpHfgQgincQF7oKffsCfX3U3dsoWZB3YfOeWoPyoODZA9MxNVIQZCgoLLOjqqsdh1e0jYSQTiUZCdUKMsBv2WUlNJaK4oXAjUxRO1mnG6cVn0dyx29hSLLHqizZCOOTa2QkD2Xb8EJkIh3lslNrV2cBZASqLba6kcQZBZAb4bkWwn4Q9fy6icS7ZBvs9ncFXlMqTgEmv2mjDGNWDZAZAmrZAIw6NuwFQF2SUFj8Joe0Yv4jASXR225rvuS2wdjaZA3wbUBa4yUNi0';
const PHONE_NUMBER_ID = '1378392788687666';

const otpStorage = {}; // Temporary store for OTPs

// 1. Send OTP Route
app.post('/api/send-whatsapp-otp', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number zaroori hai!' });

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStorage[phone] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    try {
        await axios.post(
            `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: 'whatsapp',
                to: phone,
                type: 'template',
                template: {
                    name: 'hello_world',
                    language: { code: 'en_US' }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(`OTP ${otp} sent successfully to ${phone}`);
        res.json({ success: true, message: 'WhatsApp message bhej diya gaya hai!' });
    } catch (err) {
        console.error('Error response:', err.response?.data || err.message);
        res.status(500).json({ success: false, error: 'WhatsApp message bhejne mein error aaya.' });
    }
});

// 2. Verify OTP Route
app.post('/api/verify-whatsapp-otp', (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ success: false, error: 'Phone number aur OTP dono zaroori hain!' });
    }

    const record = otpStorage[phone];

    if (!record) {
        return res.status(400).json({ success: false, error: 'Pehle OTP request karein!' });
    }

    if (Date.now() > record.expiresAt) {
        delete otpStorage[phone];
        return res.status(400).json({ success: false, error: 'OTP expire ho chuka hai. Dubara bhejein!' });
    }

    if (record.otp == otp) {
        delete otpStorage[phone];
        return res.json({ success: true, message: 'OTP successfully verify ho gaya hai!' });
    } else {
        return res.status(400).json({ success: false, error: 'Galat OTP hai. Dobara koshish karein!' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});