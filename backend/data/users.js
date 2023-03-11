import bcrypt from "bcryptjs";

// Temporary Users
const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('1234', 10),
        isAdmin: true,
    },
    {
        name: 'Temp User-1',
        email: 'user1@gmail.com',
        password: bcrypt.hashSync('1234', 10),
    },
    {
        name: 'Temp User-2',
        email: 'user2@gmail.com',
        password: bcrypt.hashSync('1234', 10),
    },
];

export default users;