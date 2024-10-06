const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json'); //updated path haha

// read the users from json
const readUsersFromFile = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

// write users to json
const writeUsersToFile = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

let nextUserId = (() => {
    const users = readUsersFromFile();
    if (users.length === 0) {
        return 1;
    }
    // find highest id to ++
    const maxId = Math.max(...users.map(user => user.id));
    return maxId + 1;
})();

const UserModel = {
    createUser: (user) => {
        const users = readUsersFromFile();
        user.id = nextUserId++;
        users.push(user);
        writeUsersToFile(users); 
        return user;
    },
    
    findUserByUsername: (username) => {
        const users = readUsersFromFile();
        return users.find(user => user.username === username);
    },

    getAllUsers: () => {
        return readUsersFromFile();
    }
};

module.exports = UserModel;
