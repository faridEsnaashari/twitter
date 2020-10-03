const zarinpalCheckout = require('zarinpal-checkout');

async function get(req, res) {
    try {

        const zarinpal = zarinpalCheckout.create(global.env.ZARINPAL.MERCHANT_ID, true);
        const amount = req.query.amount;
        const status = req.query.Status;
        const authority = req.query.Authority;

        if(status !== 'OK'){
            throw "payment process failed";
        }

        const response = await zarinpal.PaymentVerification({
            Amount: amount,
            Authority: authority,
        })

        if(!(response.status === 100 || response.status === 101)){
            throw "payment process failed";
        }

        const ref_id = response.RefID;
        res.redirect(308, global.env.ZARINPAL.MERCHANT_ID);

    }
    catch (err) {
        console.error(err);
        if(err === "payment process failed"){
            return res.responseController.error(406, "payment process failed");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;
