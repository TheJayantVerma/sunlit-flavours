const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const menuItem = require('../models/menuItem');

router.get('/', async (req, res) => {
    try {
        const menuItems = await menuItem.find().sort({ purchaseCount: -1 }).limit(3);

        res.render('home', {
            restaurantName: "Sunlit Flavors",
            menuItems: menuItems,
            currentPage: 'home'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching menu items');
    }
});

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false // Allow self-signed certificates
        }
    });

    // Create email options
    let mailOptions = {
        from: `"Sunlit Flavours" <${process.env.EMAIL_USER}>`,
        to: email, 
        subject: 'Thank you for contacting Sunlit Flavours',
        text: `Hello ${name},\n\nThank you for reaching out to Sunlit Flavours. We have received your message and will get back to you soon.\n\nMessage Summary:\n${message}\n\nBest Regards,\nThe Sunlit Flavours Team`,
        html: `<p>Hello ${name},</p><p>Thank you for reaching out to Sunlit Flavours. We have received your message and will get back to you soon.</p><p><strong>Message Summary:</strong><br>${message}</p><p>Best Regards,<br>The Sunlit Flavours Team</p>`
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.render('thankYou', { message: 'Thank you for reaching out to us. We will get back to you shortly!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('An error occurred. Please try again.');
    }
});

module.exports = router;
