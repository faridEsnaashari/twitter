const { APIKEY } = require('../../config');
const { SECRETKEY } = require('../../config');
const generateRandomCode = require('../../tools/randomCode');
const connection = require('../../tools/connection');
const token = require('../../tools/token');

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = req.query.code;

    checkCodeQuery = `select * from registerycode_tbl where phonenumber = ${phonenumber}`;
    connection.query(checkCodeQuery, (err, result, field) => {
        if (err) {
            console.log(err);
        }

        if (result.length === 0) {
            responseJson = {
                message: "phone number not found"
            };

            return res.status(201).json(responseJson);
        }
        else {
            if (result[0].code === code) {
                changeVerifiedFieldQuery = `update users_tbl set verified = true where phonenumber = '${phonenumber}'`;
                connection.query(changeVerifiedFieldQuery, (err, result, field) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    const deletePhoneNumber = `delete from registerycode_tbl where phonenumber = ${phonenumber}`;
                    connection.query(deletePhoneNumber, (err, result, field) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        const deletePhoneNumber = `select * from users_tbl where phonenumber = ${phonenumber}`;
                        connection.query(deletePhoneNumber, (err, result, field) => {
                            if (err) {
                                console.error(err);
                            }

                            const userId = result[0].user_id;
                            const responseJson = {
                                token: token.create(userId)
                            };
                            return res.status(200).json(responseJson);
                        });

                    });
                });
            }
            else {
                responseJson = {
                    message: "invalid code"
                };

                return res.status(401).json(responseJson);
            }
        }
    });
}

module.exports = get;