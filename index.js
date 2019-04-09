const express = require("express");
const app = express();
const db = require("./utils/db");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const bcryptauth = require("./utils/bc");

var hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secret: `Dazed and confused.`
    })
);

app.get("/petition", (req, res) =>
    res.render("welcome", {
        title: "Please sign this petition",
        layout: "main"
    })
);

app.get("/", (req, res) => res.redirect("/petition"));

app.get("/thankyou", (req, res) => {
    console.log(req.session, "something");
    db.getSigById(req.session.signID)
        .then(data => {
            console.log("hey", data);
            res.render("thankyou", {
                url: data.rows[0].signature,
                title:
                    "Thank you for signing this important petition that will change the world.",
                layout: "main"
            });
        })
        .catch(err => {
            console.log("err in signID:", err);
        });
});

app.post("/petition", (req, res) => {
    console.log("GET /petition!");
    console.log(req.body);

    if (req.body.name && req.body.surname && req.body.signature) {
        db.addSig(req.body.name, req.body.surname, req.body.signature)
            .then(data => {
                console.log(data);
                req.session.signID = data.rows[0].id;
                console.log(req.session, "label");
                res.redirect("/thankyou");
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
});

app.get("/signers", (req, res) => {
    db.getSigners(req.body.name, req.body.surname).then(data => {
        console.log(data);
        res.render("signers", {
            layout: "main",
            signers: data.rows
        });
    });
});
app.get("/signed", (req, res) => {
    db.getSigned().then(data => {
        console.log(data.url);
        res.render("signed", {
            id: req.session.userid,
            layout: "main",
            signed: data.rows
        });
    });
});
app.get("/register", (req, res) => {
    res.render("register", {
        layout: "main"
    });
});
app.post("/register", (req, res) => {
    console.log("blah", req.body);
    bcryptauth.hashPassword(req.body.password).then(hash => {
        db.getRegister(
            req.body.name,
            req.body.surname,
            req.body.email,
            hash
        ).then(() => {
            res.redirect("/petition");
        });
    });
});

app.get("/login", (req, res) => {
    console.log("blah", req.body);

    res.render("login", {
        layout: "main"
    });
});
app.post("/login", (req, res) => {
    db.getDBpassword(req.body.email).then(result => {
        console.log(result, "result");
        bcryptauth
            .checkPassword(req.body.password, result.rows[0].password)
            .then(check => {
                console.log(check);
                if (result == true) {
                    res.redirect("/signers");
                } else {
                    res.render("login", {
                        layout: "main",
                    error: "error"


            });
    }

});
}


app.listen(8080, () => console.log("Petition is listening! "));
