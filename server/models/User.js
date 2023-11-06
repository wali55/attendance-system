const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 10
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: (props) => `Invalid email: ${props.value}`
        }
    }, 
    password: {
        type: String,
        minLength: [6, 'Password is too short'],
        required: true
    },
    roles: {
        type: [String],
        required: true,
        default: ['STUDENT']
    },
    accountStatus: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'REJECTED'],
        default: 'PENDING',
        required: true
    },
});

const User = model('User', userSchema);

module.exports = User;