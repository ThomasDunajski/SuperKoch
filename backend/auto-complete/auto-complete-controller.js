const autoCompleteService = require('./auto-complete-service');
const express = require('express');
const router = express.Router();
const url = require('url');

router.get('/', async (req, res) => {
    const queryObject = url.parse(req.url,true).query;
    const results  = await autoCompleteService.find(queryObject.searchText);
    res.json(results);
});

module.exports = router;