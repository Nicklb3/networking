const { Schema, model } = require('mongoose');



// schema to create user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true

        },
        email: {
            type: String, 
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter a vaild email address."],
        },
        thoughts: [ 
            {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
        friends: [
            {
            type: Schema.Types.ObjectId, 
            ref: 'user',
        }
    ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual property (not stored in MongoDB) of a user's friend count
userSchema.virtual('friendcount').get(function () {
    return this.friends.length;
});

// create User model with schema
const User = model('user', userSchema);

module.exports = User;