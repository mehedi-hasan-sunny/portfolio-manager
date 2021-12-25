'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class project extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			project.hasMany(models.image, {
				onDelete: 'cascade',
				hooks: true,
			})
			project.hasMany(models.image, {
				as: 'thumbnail',
				onDelete: 'cascade',
				hooks: true,
			})
			project.hasMany(models.link, {
				foreignKey: 'linkableId',
				constraints: false,
				scope: {
					linkableType: 'project'
				}
			})
		}
	};
	project.init({
		title: DataTypes.STRING,
		description: DataTypes.STRING,
		startDate: DataTypes.DATE,
		endDate: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'project',
	});
	return project;
};