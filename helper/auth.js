exports.setDecodedPayload = (req, payload) => {
    req.headers.decodedPayload = payload
};

exports.getDecodedPayload = (req) => {
    return req.headers.decodedPayload
};