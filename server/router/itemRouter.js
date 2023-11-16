const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController.js');
const sessionController = require('../controller/sessionController.js');

router.post(
  '/',
  sessionController.verifySSID,
  itemController.createItem,
  (req, res) => {
    const newItem = res.locals.newItem;
    res.status(200).json(newItem);
  }
);

router.get(
  '/',
  sessionController.verifySSID,
  itemController.getAllItems,
  (req, res) => {
    const allListings = res.locals.allListings;
    res.status(200).json(allListings);
  }
);

router.get(
  '/filter',
  sessionController.verifySSID,
  itemController.filterItems,
  (req, res) => {
    const filtered = res.locals.filtered;
    res.status(200).json(filtered);
  }
);

module.exports = router;
