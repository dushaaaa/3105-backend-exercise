const fs = require('fs');
const path = require('path');

// Path to the JSON file
const filePath = path.join(__dirname, 'users.json');

// Helper function to read the users from the JSON file
const readUsersFromFile = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data); // Convert JSON string to JS object
};

// Helper function to write users to the JSON file
const writeUsersToFile = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); // Convert JS object to JSON string
};

let nextUserId = (() => {
    const users = readUsersFromFile();
    if (users.length === 0) {
        return 1;
    }
    // Find the highest ID in the current users and increment from that
    const maxId = Math.max(...users.map(user => user.id));
    return maxId + 1;
})();

const UserModel = {
    createUser: (user) => {
        const users = readUsersFromFile();
        user.id = nextUserId++; // Auto-increment the ID
        users.push(user);
        writeUsersToFile(users); // Save updated users to JSON file
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
