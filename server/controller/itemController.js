const Item = require("../models/itemModel.js");

const itemController = {};

itemController.createItem = (req, res, next) => {
  console.log(
    "in the itemController, and here are the contents of the request body: ",
    req.body
  );
  Item.create(req.body) //makes a new Item document in mongoDB and returns it
    .then((data) => {
      res.locals.newItem = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: "there is an error it itemController createItem",
        status: 400,
        message: { err: err.message },
      });
    });
};

itemController.getAllItems = async (req, res, next) => {
  try {
    let allListings = await Item.find({}); //serve the entire Item collection
    console.log("here are all of the listings: ", allListings);
    res.locals.allListings = allListings;
    return next();
  } catch (err) {
    return next({
      log: "there is an error it itemController getAllItems",
      status: 400,
      message: { err: err.message },
    });
  }
};

itemController.filterItems = async (req, res, rext) => {

    const { borough, neighborhood } = req.query;

    try {
      let filtered = await Item.find({ location: [borough, neighborhood] });
      console.log("here are the filtered listings: ", filtered);
      res.locals.filtered = filtered;
      return next();
    } catch (err) {
      return next({
        log: "there is an error it itemController filterItems",
        status: 400,
        message: { err: err.message },
      });
    }
}

module.exports = itemController;
