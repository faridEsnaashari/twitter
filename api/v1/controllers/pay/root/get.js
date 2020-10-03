const zarinpalCheckout = require('zarinpal-checkout');

async function get(req, res) {
    try {

        const zarinpal = zarinpalCheckout.create(global.env.ZARINPAL.MERCHANT_ID, false);
        const amount = req.query.amount;

        const response = await zarinpal.PaymentRequest({
            Amount: amount,
            CallbackURL: `${ global.env.GENERAL.ROOT_ENDPOINT }pay/verify?amount=${ amount }`,
            Description: 'pay for the game'
        });

        if(response.status !== 100){
            throw "zarinpal error";
        }

        const url = response.url;
                return res.responseController.send(200, "pay request done successful", { url: url });
    }
    catch (err) {
        console.error(err);
        if(err === "zarinpal error"){
            return res.responseController.error(503, "zarinpal returns an error");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;
