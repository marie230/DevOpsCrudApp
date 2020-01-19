const express = require('express');
const router = express.Router();
const Heroes = require('../db/hero-model');

// get a list of heroes from the database
router.get('/heroes', (req, res, next) => {
  Heroes.find({}).then(function (heroes) {
    res.send(heroes);
  }).catch(next);
});

// get a specific hero from the database
router.get('/heroes/:id', (req, res, next) => {
  Heroes.findById({_id: req.params.id}).then(function (hero) {
    res.send(hero);
  }).catch(next);
});

// add a new hero to the database
router.post('/heroes', (req, res, next) => {
  Heroes.create(req.body).then(function (hero) {
    res.send(hero);
  }).catch(next);
});

// update hero in the database
router.put('/heroes/:id', (req, res, next) => {
  Heroes.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
    Heroes.findOne({_id: req.params.id}).then(function (hero) {
      res.send(hero);
    });
  }).catch(next);
});

// delete hero from the db
router.delete('/heroes/:id', (req, res, next) => {
  Heroes.findByIdAndRemove({_id: req.params.id}).then(function (hero) {
    res.send(hero);
  }).catch(next);
});

module.exports = router;
