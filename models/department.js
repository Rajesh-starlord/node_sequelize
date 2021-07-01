module.exports = (sequelize, type) => {
    return sequelize.define('department', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        deptname: {
            type:type.STRING,
            allowNull: false
        }
    })
};