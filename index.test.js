const { app } = require("./index");
const supertest = require("supertest");

const bodyParser = require("body-parser");
jest.mock(bodyParser);
//
// test("GET /welcome works correctly", () => {
//     return supertest(app)
//         .get("/welcome")
//         .then(res => {
//             console.log(res.headers);
//             console.log(res.text);
//             expect(res.statusCode).toBe(200);
//         });
// });

// test("GET /welcome works correctly", () => {
//     return supertest(app)
//         .get("/welcome")
//         .expect(200)
//         .expect("content-type", "text/html")
//         .end();
// });
