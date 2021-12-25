'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn(
				'images',
				"isThumbnail",
				{
					type: Sequelize.BOOLEAN,
					defaultValue: false,
					after: "url"
				}
		);
	},
	
	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('images', 'isThumbnail');
	}
};
