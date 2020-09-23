const mongoose = require('mongoose');

const phonenumber_detail = {
    type: String,
    required: true,
    unique: true,
};

const code_detail = {
    type: String,
    required: true,
}

const verified_detail = {
    type: Boolean,
    default: false
}

const verification_log_schema = new mongoose.Schema({
    phonenumber: phonenumber_detail,
    code: code_detail,
    verified: verified_detail
});

module.exports = mongoose.model('Verification_log', verification_log_schema, 'verification_logs');
