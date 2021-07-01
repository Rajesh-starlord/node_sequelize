module.exports = (sequelize, type) => {
    return sequelize.define('project', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        projectname: {
            type: type.STRING,
            allowNull: false
        }
    })
};