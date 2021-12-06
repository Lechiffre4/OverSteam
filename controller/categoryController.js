var { db } = require('../database/database');
var asyncLib = require('async');

// Routes
module.exports = {
  // All categories function
  getAllCategories: function (req, res) {
    const categories = db.models.Category.findAll()
      .then(function (categories) {
        if (categories) {
          res.status(201).json(categories);
          console.log(JSON.stringify(categories, null, 2));
        } else {
          res.status(404).json({ 'error': 'no categories were found' });
        }
      }).catch(function (err) {
        res.status(500).json({ 'error': 'cannot fetch categories' });
      });
  }
};
