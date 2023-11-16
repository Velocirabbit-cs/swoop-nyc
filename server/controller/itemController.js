const Item = require('../models/itemModel.js');

const itemController = {};

itemController.createItem = (req, res, next) => {
  console.log(
    'in the itemController, and here are the contents of the request body: ',
    req.body
  );

  if (
    typeof req.body.title !== 'string' ||
    typeof req.body.description !== 'string' ||
    typeof req.body.borough !== 'string' ||
    typeof req.body.neighborhood !== 'string'
  ) {
    return next({
      log: 'Missing one or more required DB Schema properties in itemController createItem',
      status: 401,
      message: { err: 'Missing one or more required database properties' },
    });
  }

  Item.create(req.body) //makes a new Item document in mongoDB and returns it
    .then((data) => {
      res.locals.newItem = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'there is an error it itemController createItem',
        status: 400,
        message: { err: err.message },
      });
    });
};

itemController.getAllItems = async (req, res, next) => {
  try {
    let allListings = await Item.find({}); //serve the entire Item collection
    console.log('here are all of the listings: ', allListings);
    res.locals.allListings = allListings;
    return next();
  } catch (err) {
    return next({
      log: 'there is an error it itemController getAllItems',
      status: 400,
      message: { err: err.message },
    });
  }
};

itemController.filterItems = async (req, res, next) => {
  console.log(req.query);
  const { borough, neighborhood } = req.query;
  console.log('in filter: ', borough, neighborhood);
  try {
    let filtered = await Item.find({ borough, neighborhood });
    console.log('here are the filtered listings: ', filtered);
    res.locals.filtered = filtered;
    return next();
  } catch (err) {
    return next({
      log: 'there is an error it itemController filterItems',
      status: 400,
      message: { err: err.message },
    });
  }
};

module.exports = itemController;
