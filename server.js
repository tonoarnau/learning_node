const express = require("express");
const hbs = require('hbs');
const fs = require('fs');

const app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});


// Stop everything after to be executed.
// Enter in MAINTENANCE MODE

// app.use((req,res, next) => {
//     res.render('maintenance.hbs');
// });


// Middleware for serving static html pages
app.use(express.static(__dirname + '/public'));




hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to Node js website',
    });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Unable to handle request"
  });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});




