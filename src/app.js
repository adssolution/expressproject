const exp = require('constants');
const express = require('express');
const app = new express();
const path = require('path');
const hbs = require('hbs');
const requests = require('requests');


const staticPath = path.join(__dirname, "../public")
const partialPath = path.join(__dirname, "templates/partials");
hbs.registerPartials(partialPath);
//console.log(staticPath);
const hbsTempPath = path.join(__dirname, "templates/views");
//console.log(hbsTempPath);
app.set("views", hbsTempPath);
app.set("view engine", "hbs");


app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.render("index", {
        autherName: "Amandeep",
    });
});
app.get("/wheather", (req, res) => {
    requests('https://api.openweathermap.org/data/2.5/weather?q=pune&appid=3045dd712ffe6e702e3245525ac7fa38')
        .on('data', function(chunk) {
            const decodeData = JSON.parse(chunk);



        })
        .on('end', function(err) {
            if (err) return console.log('connection closed due to errors', err);

            res.end();
        });
});


app.get('/about', (req, res) => {
    res.render("about")
})
app.get("*", (req, res) => {
    res.render('404');
})
app.listen(4000);