const jwt = require("jsonwebtoken");
const db = require("../Database");
require('dotenv').config()
function auth(req, res, next)  {
    const token = req.cookies.token
    console.log(token);
    if (!token) return res.status(401).send({
        ok: false,
        error: "Access denied. No token provided"
    });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {console.log('problem');
            return res.status(401).send({
                ok: false,
                error: "Access denied. No token provided"
            });
        } else {
            let state = `SELECT U.Email, U.Password, U.Role, U.ID, U.Validated FROM users U WHERE U.Token = "${token}";`;
            db.query(state, (err, result) => {

                if (err || result[0].ID != req.cookies.id) {
                    console.log(req.cookies.id);
                    console.log(result[0].ID);
                    console.log(req.cookies.id == result[0].ID);
                    return res.status(401).send({
                        ok: false,
                        error: "Access denied. No token provided"
                    });
                } else {
                    console.log('ok')
                    next();
                }
            });
        }
    })
}
module.exports = { auth };

