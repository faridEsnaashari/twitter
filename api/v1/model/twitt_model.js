const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const text_detail = {
    type: String,
    required: true,
};

const user_id_detail = [{
    type: types.ObjectId,
    ref: 'User',
    required: true
}]

const replay_to_id_detail = [{
    type: types.ObjectId,
    ref: 'Twitt',
    default: null
}]

const twitts_ids_replay_to_this_twitt_detail = [{
    type: types.ObjectId,
    ref: 'Twitt',
    default: null
}]

const users_retwitt_this_twitt_detail = [{
    type: types.ObjectId,
    ref: 'User',
    default: null
}]

const users_like_this_twitt_detail = [{
    type: types.ObjectId,
    ref: 'User',
    default: null
}]

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
    deleted: deleted_detail,
    replay_to_id: replay_to_id_detail,
    twitts_ids_replay_to_this_twitt: twitts_ids_replay_to_this_twitt_detail,
    users_retwitt_this_twitt: users_retwitt_this_twitt_detail,
    users_like_this_twitt: users_like_this_twitt_detail,
});

module.exports = mongoose.model('Twitt', twitt_schema, 'twitts');
