module.exports = app => {
    const categories = require("../controllers/category.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Project
    router.post("/", categories.create);
  
    // Retrieve all Projects
    router.get("/", categories.findAll);
  
    // Retrieve all published Projects
    router.get("/published", categories.findAllPublished);
  
    // Retrieve a single Project with id
    router.get("/:id", categories.findOne);
  
    // Update a Project with id
    router.put("/:id", categories.update);
  
    // Delete a Project with id
    router.delete("/:id", categories.delete);
  
    // Create a new Project
    router.delete("/", categories.deleteAll);
  
    app.use('/api/categories', router);
    
  };