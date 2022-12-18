const { getObjectFromJWT } = require('../security/jwt');
const { setDecodedPayload, getDecodedPayload } = require('../helper/auth');
const { status, message, getResponseStructure } = require("../utils/response.utils");

exports.verifyToken = async (req, res, next) => {
    let auth = req.get('Authorization')
    if (!auth) {
        res
            .status(status.success)
            .send(getResponseStructure(status.success, message.tokenMissing));
    } else {
        let token = auth.split(' ')[1];
        if (!token) {
            res
                .status(status.success)
                .send(getResponseStructure(status.success, message.tokenMissing));
        } else {
            try {
                setDecodedPayload(req, getObjectFromJWT(token));
                req.user = getDecodedPayload(req);
                req.user = req.user.user
                next();
            } catch (err) {
                console.log(err);
                if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError")
                    return res.status(200).send("SESSION EXPIRED")
                return res.status(200).send("FAILURE")
            }
        }
    }
};

