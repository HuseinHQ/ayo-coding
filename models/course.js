'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.User, {
        through: models.UserCourse
      })
      Course.belongsTo(models.Category)
      Course.hasMany(models.UserCourse)
    }

    static getTotalCourse(option) {
      return this.findOne({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('id')), 'totalCourse']
        ],
        ...option
      })
    }
  }
  Course.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    thumbnail: DataTypes.TEXT,
    CategoryId: DataTypes.INTEGER,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};