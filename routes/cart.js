const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', async (req, res) => {
  try {
    res.render('cart', { currentPage: 'cart' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/checkout', async (req, res) => {
  const { name, email, address, itemCountToSend, itemPriceToSend } = req.body;

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
        subject: 'Order Confirmation - Sunlit Flavours',
        text: `Thank you ${name} for your order! Your order of amount ₹${itemPriceToSend} for ${itemCountToSend} item(s) has been successfully placed and will be delivered at ${address} within an hour. We appreciate your business.`,
        html: `<p>Thank you ${name} for your order! Your order of amount ₹${itemPriceToSend} for ${itemCountToSend} item(s) has been successfully placed and will be delivered at ${address} within an hour. We appreciate your business.</p>`
        };

    try {
        await transporter.sendMail(mailOptions);
        res.render('thankYou', { message: 'Thank you for your patronage! Your order has been successfully placed.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('An error occurred. Please try again.');
  }
});

module.exports = router;