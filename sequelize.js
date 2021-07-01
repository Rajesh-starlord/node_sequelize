const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const DeptModel = require('./models/department');
const ProjectModel = require('./models/project');
const ProjectAssignModel = require('./models/projectassign');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Department = DeptModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const ProjectAssign = ProjectAssignModel(sequelize, Sequelize);

User.belongsToMany(Project, { through: ProjectAssign });
Project.belongsToMany(User, { through: ProjectAssign });

sequelize.sync()
    .then(() => {
        console.log(`Database & tables created!`)
    }).catch(err => {
        console.log(err.stack);
    });

module.exports = {
    User,
    Department,
    Project,
    ProjectAssign
}