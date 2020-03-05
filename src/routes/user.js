const express = require('express');
const router = new express.Router()
const user = require("../db/user");

router.get("/users", async (req, res) => {
    try {
      let users = await user.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send();
    }
  });

  router.get("/users/search", async (req, res) => {
    try {
      let checklen = req.query.name.length;
      if (checklen >= 3) {
        let users = await user.find({
          firstName: {
            $regex: "^" + req.query.name + ".*",
            $options: "i"
          }
        });
        res.send(users);
      } else {
        res.send("Input minimum 3 characters");
      }
    } catch (error) {
      res.status(500).send();
    }
  });

  router.post("/users", async (req, res) => {
    try {
      const newUserModel = new user({
        ...req.body
      });
      await newUserModel.save();
      res.status(201).end();
    } catch (error) {
      res.status(400).json(error);
    }
  });

  module.exports = router