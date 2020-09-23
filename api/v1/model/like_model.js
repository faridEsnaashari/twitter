const mongoose = require('mongoose');

const user_id_detail = {
    type: types.ObjectId,
    ref: 'User',
    required: true
}

const twitt_id_detail = {
    type: types.ObjectId,
    ref: 'Twitt',
    required: true
}

const like_schema = new mongoose.Schema({
    user_id: user_id_detail,
    twitt_id: twitt_id_detail
});

module.exports = mongoose.model('Like', like_schema, 'likes');
