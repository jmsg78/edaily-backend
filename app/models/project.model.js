module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.FLOAT
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Project;
  };
