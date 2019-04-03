var pg = require("pg");
//create pool instance
var dbUrl = "postgres://Barris:@localhost:5432/cities";

dbUrl = require("url").parse(dbUrl);

var dbUser = dbUrl.auth.split(":");

var dbConfig = {
    user: dbUser[0],
    database: dbUrl.pathname.slice(1),
    password: dbUser[1],
    host: dbUrl.hostname,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

var pool = new pg.Pool(dbConfig);

pool.on("error", function(err) {
    console.log(err);
});
/*
//connect to pool
pool.connect(function(err, client, done) {
    if (!err) {
        client.query("SELECT * FROM cities", function(err, data) {
            if (!err) {
                // console.log(data.rows);
            }
            done(); //because pool.connect
        });
    }
});
*/
//prevent SQL inject, let pg build the string to search for
function getCity(cityName) {
    var query = "SELECT * FROM cities WHERE city = $1";

    pool.query(query, [cityName], function(err, results) {
        if (!err) {
            console.log(results.rows);
        }
    });
}
getCity("Berlin");
