const spicedPg = require("spiced-pg");

const db = spicedPg("postgres:postgres:postgres@localhost:5432/petition");

exports.addSig = function addSig(firstname, lastname, signature, user_id) {
    let q =
        "INSERT INTO signatures (firstname, lastname, signature, user_id) VALUES ($1, $2, $3, $4) RETURNING ID";
    let params = [firstname, lastname, signature, user_id];
    return db.query(q, params);
};
exports.getSigners = function getSigners() {
    let q = "SELECT * FROM signatures";
    return db.query(q);
};
exports.getSigned = function getSigned() {
    let q = "SELECT * FROM signatures";
    return db.query(q);
};
exports.getSigById = function getSigById(id) {
    let q = "SELECT signature FROM signatures WHERE id = $1";
    let params = [id];
    return db.query(q, params);
};
exports.getRegister = function getRegister(
    firstname,
    lastname,
    email,
    password
) {
    let q =
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING ID";
    let params = [firstname, lastname, email, password];
    return db.query(q, params);
};
exports.getDBpassword = function getDBpassword(email) {
    let q = `SELECT password FROM users WHERE email = $1`;
    let params = [email];
    return db.query(q, params);
};
exports.getLogin = function getLogin() {
    let q = "SELECT * FROM users";
    return db.query(q);
};
