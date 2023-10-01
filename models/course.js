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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Desciption is required'
        },
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price is required'
        },
        notEmpty: {
          msg: 'Price is required'
        }
      }
    },
    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Thumbnail is required'
        },
        notEmpty: {
          msg: 'Thumbnail is required'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category is required'
        },
        notEmpty: {
          msg: 'Category is required'
        }
      }
    },
    rating: {
      type: DataTypes.FLOAT,
    }
  }, {
    hooks: {
      beforeCreate(course) {
        course.rating = 0;
      }
    },
    sequelize,
    modelName: 'Course',
  });
  return Course;
};