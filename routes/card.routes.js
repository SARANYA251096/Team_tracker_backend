const express = require("express");
const cardRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { CardModel } = require("../models/CardModel");

cardRouter.use(authenticator);

cardRouter.get("/", async (req, res) => {
  let token = req.headers.authorization;

  jwt.verify(token, "saranyaaa", async (err, decode) => {
    try {
      let data = await CardModel.find({ user: decode.userId });
      res.send({
        data: data,
        message: "Success",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });
});

// create cards
cardRouter.post("/create", async (req, res) => {
  try {
    let card = new CardModel(req.body);
    await card.save();
    res.send({
      message: "Card is created",
      status: 1,
    });
  } catch (error) {
    res.send({ message: error.message, status: 0 });
  }
});

// update cards
cardRouter.put("/edit", async (req, res) => {
  let { id } = req.headers;
  try {
    await CardModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({
      message: "card updated",
      status: 1,
    });
    // console.log(CardModel)
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

// Delete cards
cardRouter.delete("/delete", async (req, res) => {
  let { id } = req.headers;
  try {
    await CardModel.findByIdAndDelete({ _id: id });
    res.send({ message: "card Deleted" });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

module.exports = { cardRouter };
