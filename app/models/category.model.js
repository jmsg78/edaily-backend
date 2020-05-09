module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Category;
  };
