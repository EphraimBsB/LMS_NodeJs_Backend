'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class New_Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  New_Stock.init({
    new_copies: DataTypes.STRING(5),
    new_acc_num: DataTypes.STRING(50),
    source: DataTypes.STRING(10),
    from: DataTypes.STRING(20)
  }, {
    sequelize,
    modelName: 'New_Stock',
  });
  return New_Stock;
};