const { connection, executeQuery } = require('../../../tools/connectionManager');
const token = require('../../../tools/token');
const fetch = require('node-fetch');

async function get(req, res) {
    try{
        const twitt_id = req.query.twitt_id;

        let query = `select * from twitts_tbl where twitt_id = ${ twitt_id }`;
        const selectFromTwittsTBLResult = await executeQuery(connection, query);

        if(selectFromTwittsTBLResult.length === 0){
            throw "twitt not found";
        }

        query = `update twitts_tbl set deleted = true where twitt_id = ${ twitt_id }`;
        const updateTwittsTBLResult = await executeQuery(connection, query);

        return res.responseController.send(200, "twitt deleted successfuly");

    }
    catch(err){
        console.error(err);
        if(err === "twitt not found"){
            return res.responseController.error(404, "twitt not found");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;