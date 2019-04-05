const express = require("express");
const app = express();
const db = require("./utils/db");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

var hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 14, //time to expire the session
        secret: `Dazed and confused.`
    })
);

app.get("/petition", (req, res) => {
    res.cookie("sigId");
    req.session.sigId = results.rows[0].id;
    // req.session.sigId = 10; //atob() used for decode the cookie (or btoa, check)
    res.send(`<p>Cigarette smoke is everywhere you go in Serbia.</br>
   Please sign this petition to ban cigarette smoke in public places.</p>`);
});

app.post("/petition", (req, res) => {
    if (req.session.sigId) {
        res.send("welcome" + sigId);
    }
});
app.get("/", (req, res) => res.redirect("/petition"));

app.get("/petition", (req, res) =>
    res.render("welcome", {
        title: "Please sign this petition",
        layout: "main"
    })
);
app.get("/thankyou", (req, res) =>
    res.render("thankyou", {
        title:
            "Thank you for signing this important petition that will change the world.",
        layout: "main"
    })
);
//any changes to a db (UPDATE, )

app.post("/petition", (req, res) => {
    console.log("GET /petition!");
    console.log(req.body);
    if (req.body.name && req.body.surname && req.body.signature) {
        db.addSig(req.body.name, req.body.surname, req.body.signature)
            .then(() => {
                console.log("SUCCESS!!!");
                //send response to front
                //res.render or send a template
                //back as a response
            })
            .catch(err => {
                console.log("err in addSign:", err);
            });
    } else {
        res.render("welcome", {
            layout: "main",
            error: "error"
        });
    }

    // how to we query a database from our express server?
});

app.listen(8080, () => console.log("Petition is listening! "));
