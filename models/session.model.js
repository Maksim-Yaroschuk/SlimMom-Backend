const {Schema, model} = require('mongoose');

const sessionSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        
    },
    // refreshToken: {
    //     type: String,
    //     default: null
    // },
    // createAt: {
    //     type: Date,
    //     default: Date.now,
    //     expires: 30*86400
    // },
});

const Session = model("session", sessionSchema);

module.exports = {
    Session,
};