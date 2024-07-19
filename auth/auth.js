const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./models');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).send('User registered');
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.send({ token });
});

module.exports = router;
