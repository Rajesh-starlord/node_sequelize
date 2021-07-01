const users = [{
    userid: 'Admin',
    password: 'Starlord'
}];
const AuthService = {
    AutherizeUser: async function (user) {
        let userFound = users.filter(u => u.userid === user.userid && u.password === user.password);
        return userFound.length > 0;
    }

}

module.exports = AuthService;