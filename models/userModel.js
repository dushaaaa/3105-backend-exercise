const users = [];

const UserModel = {
    createUser: (user) => {
        users.push(user);
        return user;
    },
    findUserByUsername: (username) => {
        return users.find(user => user.username === username);
    },
    getAllUsers: () => {
        return users;
    }
};

module.exports = UserModel;
