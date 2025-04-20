const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const JWT_SECRET = 'ABC123';

const resolvers = {
    Query: {
        me: async (_, __, { req }) => {
            const token = req.headers.authorization || '';
            if (!token) return null;
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                return await User.findById(decoded.id);
            } catch (err) {
                console.error('Error in me query:', err);
                return null;
            }
        }
    },
    Mutation: {
        signup: async (_, { username, email, password, role }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error('User already exists');

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                role,
                createdAt: new Date()
            });
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('No such user found');

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error('Invalid password');

            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
            return { token, user };
        },
        logout: async (_, __, { req }) => {
            // JWT logout is typically handled client-side by removing the token.
            return true;
        }
    }
};

module.exports = resolvers;
