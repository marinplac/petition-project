const spicedPg = require("spiced-pg");

const db = spicedPg("postgres:postgres:postgres@localhost:5432/petition");

exports.addSig = function addSig(firstname, lastname, signature) {
    let q =
        "INSERT INTO signatures (firstname, lastname, signature) VALUES ($1, $2, $3) RETURNING ID";
    let params = [firstname, lastname, signature];
    return db.query(q, params);
};
