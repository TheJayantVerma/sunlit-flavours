const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('about', { currentPage: 'about' });
    } catch (error) {
        res.status(500).send('An error occurred: ' + error.message);
    }
});

module.exports = router;