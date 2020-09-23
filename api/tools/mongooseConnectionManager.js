let mongoose = require('mongoose');

const option = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};

mongoose.connect(global.env.MONGOOSE.MONGOOSE_URL, option)
    .then(() => {
        console.log("mongoose connected successfully");
    })
    .catch(err => console.error(err))

module.exports = mongoose;
