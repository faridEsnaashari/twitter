const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const twitts_ids_detail = [{
    type: types.ObjectId,
    ref: 'Twitt',
    default: null
}]

const phonenumber_detail = {
    type: String,
    required: true,
    unique: true,
};

const national_id_number_detail = {
    type: String,
    required: true,
    unique: true,
}

const username_detail = {
    type: String,
    default: ""
}

const userfamily_detail = {
    type: String,
    default: ""
}

const user_schema = new mongoose.Schema({
    username: username_detail,
    userfamily: userfamily_detail,
    phonenumber: phonenumber_detail,
    national_id_number: national_id_number_detail,
    twitts_ids: twitts_ids_detail
});

module.exports = mongoose.model('User', user_schema, 'users');
