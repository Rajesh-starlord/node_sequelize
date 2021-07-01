module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type:type.STRING,
            allowNull: false
        },
        dept:{
            type:type.INTEGER,
            references: {
                model: 'departments',
                key: 'id',
              },
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
              allowNull: false
        }
    })
};