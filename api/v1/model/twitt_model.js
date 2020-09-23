const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const text_detail = {
    type: String,
    required: true,
};

const user_id_detail = {
    type: types.ObjectId,
    ref: 'User',
    required: true
}

const replay_to_id_detail = {
    type: types.ObjectId,
    ref: 'Twitt',
    required: true
}

const date_detail = {
    type: Number,
    maxLength: 13,
    default: Date.now()
}

const deleted_detail = {
    type: Boolean,
    default: false
} 

const img_link_detail = {
    type: String,
    default: ""
}

const twitt_schema = new mongoose.Schema({
    text: text_detail,
    img_link: img_link_detail,
    user_id: user_id_detail,
    date: date_detail,
    replay_to_id: replay_to_id_detail,
    deleted: deleted_detail
});

module.exports = mongoose.model('Twitt', twitt_schema, 'twitts');
