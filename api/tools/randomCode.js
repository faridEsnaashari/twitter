function generateRandomCode(){
    return Math.floor(Math.floor(10000 + Math.random() * 90000)) + 1;
}
module.exports = generateRandomCode;