const connection = require('../../tools/connection');
const fetch = require('node-fetch');
const generateRandomCode = require('../../tools/randomCode');

async function post(req, res) {
    const username = req.body.username;
    const userfamily = req.body.userfamily;
    const phonenumber = req.body.phonenumber;
    const national_id_number = req.body.national_id_number;

    const code = generateRandomCode();

    const insertUserQuery = `insert into users_tbl(username, userfamily, phonenumber, national_id_number) value('${username}', '${userfamily}', '${phonenumber}', '${national_id_number}')`;
    connection.query(insertUserQuery, async (err, result, fields) => {
        if (err) {
            if(err.code === 'ER_DUP_ENTRY'){
                responseJson = {
                    message: "user already existed"
                };
        
                return res.status(201).json(responseJson);
            }
            console.error(err);
            return;
        }
        try {
            const fetchResult = await fetch(`http://localhost:3000/sendvrificationcode?phonenumber=${phonenumber}&code=${code}`);
            const fetchBody = await fetchResult.json();
            if (fetchResult.status === 200) {
                const deleteIfExistedQuery = `delete from registerycode_tbl where phonenumber = ${phonenumber}`;
                    connection.query(deleteIfExistedQuery, async (err, result, fields) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        const insertIntoRegestryQuery = `insert into registerycode_tbl value('${phonenumber}', '${code}')`
                        connection.query(insertIntoRegestryQuery, async (err, result, fields) => {
                            if (err) {
                                console.error(err);
                                return;
                            }

                            const responseJson = {
                                message: "user created"
                            };
                            return res.status(201).json(responseJson);
                        });
                    });
            }
        }
        catch (err) {
            console.log(err);
        }
    });

}

module.exports = post;