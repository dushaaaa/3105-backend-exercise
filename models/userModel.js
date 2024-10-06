const users = [];
let nextUserId = 1;

const UserModel = {
    createUser: (user) => {
        user.id = nextUserId++;
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
