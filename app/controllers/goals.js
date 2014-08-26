'use strict';

var Goals = require('../models/goal');



exports.new = function(req, res){
  res.render('goals/new');
};


exports.create = function(req, res){
  Goals.create(req.body, res.locals.user._id, function(){
    res.render('goals/index');
  });
};

exports.index = function(req, res){
  Goals.findAllByUserId(res.locals.user._id, function(err, goals){
    res.render('goals/index', {goals:goals});
  });
};
