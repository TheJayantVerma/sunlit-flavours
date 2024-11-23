const express = require('express');
const router = express.Router();
const menuItem = require('../models/menuItem');

router.get('/', async (req, res) => {
    try {
        const menuItems = await menuItem.find();
        res.render('menu', { menuItems: menuItems, currentPage: 'menu' });
    } catch (error) {
        res.status(500).send('An error occurred: ' + error.message);
    }
});

module.exports = router;
