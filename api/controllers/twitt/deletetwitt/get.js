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

        const responseJson = {
            status: 200,
            success: true,
            message: "twitt deleted successfuly"
        };
        return res.status(200).json(responseJson);

    }
    catch(err){
        console.error(err);
        if(err === "twitt not found"){
            const error = {
                status: 404,
                success: false,
                message: "twitt not found"
            };
            return res.status(404).json(error);
        }

        const error = {
            status: 500,
            success: false,
            message: "internal server error",
        };
        return res.status(500).json(error);
    }
}

module.exports = get;