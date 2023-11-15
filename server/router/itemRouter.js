const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController.js');
const sessionController = require('../controller/sessionController.js');

router.post(
  '/',
  sessionController.verifySSID,
  itemController.createItem,
  (req, res) => {
    console.log('leaving server');
    const newItem = res.locals.newItem;
    res.status(200).json(newItem);
  }
);

router.get(
  '/',
  sessionController.verifySSID,
  itemController.getAllItems,
  (req, res) => {
    console.log('leaving server');
    const allListings = res.locals.allListings;
    res.status(200).json(allListings);
  }
);

router.get(
  '/filter',
  sessionController.verifySSID,
  itemController.filterItems,
  (req, res) => {
    console.log('leaving server');
    const filtered = res.locals.filtered;
    res.status(200).json(filtered);
  }
);

module.exports = router;
