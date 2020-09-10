const connection = require('../../tools/connection');
const fetch = require('node-fetch');
const generateRandomCode = require('../../tools/randomCode');

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = generateRandomCode();
    const userExistsQuery = `select * from users_tbl where phonenumber = ${phonenumber}`;
    connection.query(userExistsQuery, async (err, result, fields) => {
        if (err) {
            console.error(err);
            return;
        }

        if (result.length === 0) {
            const responseJson = {
                message: "user doesn't exist"
            };
            return res.status(404).json(responseJson);
        }
        else {
            try {
                const fetchResult = await fetch(`http://localhost:3000/sendvrificationcode?phonenumber=${phonenumber}&code=${code}`);
                const fetchBody = await fetchResult.json();
                if (fetchResult.status === 200) {
                    const deleteIfExistedQuery = `delete from registerycode_tbl where phonenumber = ${phonenumber}`;
                    console.log("salam3");
                    connection.query(deleteIfExistedQuery, async (err, result, fields) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        const insertIntoRegestryQuery = `insert into registerycode_tbl value('${phonenumber}', '${code}')`
                        console.log("salam4");
                        connection.query(insertIntoRegestryQuery, async (err, result, fields) => {
                            if (err) {
                                console.error(err);
                                return;
                            }

                            const responseJson = {
                                message: "code sent successfully"
                            };
                            return res.status(200).json(responseJson);
                        });
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    });

}

module.exports = get;