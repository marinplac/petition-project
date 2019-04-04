const spicedPg = require("spiced-pg");

const db = spicedPg("postgres:spicedling:postgres@localhost:5432/petition");

exports.addCity = function addCity(city, country, description) {
    let q = "INSERT INTO cities (cities) VALUES ($1, $2, $3)";
    let params = [city, country, description];
    return db.query(q, params);
};
