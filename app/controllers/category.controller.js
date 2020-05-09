const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = (req, res) => {

    // Validate request
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a Category
      const category = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
      };
    
      // Save Category in the database
      Category.create(category)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the category."
          });
        });
};

// Retrieve all Categorys from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Category.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      });  
};

// Find a single Category with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving category with id=" + id
        });
      });  
};

// Update a Category by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update category with id=${id}. Maybe category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating category with id=" + id
        });
      }); 
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete category with id=${id}. Maybe category was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete category with id=" + id
        });
      }); 
};

// Delete all Categorys from the database.
exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} categories were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all categories."
          });
        });  
};

// Find all published Categorys
exports.findAllPublished = (req, res) => {
    Category.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    }); 
};