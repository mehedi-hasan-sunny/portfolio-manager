'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      link.belongsTo(models.user, {
        foreignKey: 'linkableId',
        constraints: false,
      });
      link.belongsTo(models.project, {
        foreignKey: 'linkableId',
        constraints: false,
      })
      link.belongsTo(models.linkCategory, {
        foreignKey: 'linkCategoryId',
        constraints: false,
      })
    }
  };
  link.init({
    url: DataTypes.TEXT,
    linkableId: DataTypes.INTEGER,
    linkableType: DataTypes.TEXT('long'),
    linkCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'link',
  });
  return link;
};