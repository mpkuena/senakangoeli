const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    avatar: String,
    role: { type: String, enum: ['provider', 'requestor'] },
});

const serviceSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    images: String,
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model('User', userSchema);
const Service = mongoose.model('Service', serviceSchema);

module.exports = { User, Service };
