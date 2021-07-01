module.exports = (sequelize, type) => {
    return sequelize.define('projectassign', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }
    })
};