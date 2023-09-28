'use strict';
const validator = require('validator');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    get dateFormat() {
      return this.birthDate.toISOString().split('T')[0];
    }
  }
  Profile.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fullName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    address: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      validate: {
        isMobilePhone(value) {
          const isPhoneValid = validator.isMobilePhone(value, 'id-ID');
          if (!isPhoneValid) {
            throw new Error('Nomor telepon tidak valid');
          }
        }
      }
    },
    profilePicture: DataTypes.TEXT,
    isMember: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate(profile) {
        profile.isMember = false;
      }
    },
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};