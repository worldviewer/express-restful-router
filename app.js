// You'll need the following article routes:

// get /articles to display a summary each article.
// get /articles/new to get a form to save a new article
// post /articles to save an article
// get /articles/:id to find an article by id in the array of articles and display it.
// You'll need the following site related routes:

// get / serve the homepage of your site.
// get /about serve a static about daily planet page.
// get /contact serve a static contact page.

// db.article
//     .findAll()
//     .then(function (articles) {
//       res.render("articles/index", {articlesList: articles});
//     });

// db.article
//     .create(...)
//     .then(function (article) {
//         res.redirect("/articles");
//     });

var express = require('express');
var bodyParser = require('body-parser');
var pg = require("pg");
var methodOverride = require('method-override');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use( express.static( "views/site" ) );

// Refactor connection and query code
var db = require('./models');

// Set up method override to work with POST requests that have the
// parameter "_method=DELETE" or "_method=PATCH"
app.use(methodOverride('_method'));

app.get('/articles', function(req,res) {
	db.Article
	    .all()
	    .then(function (articles) {
	      res.render("articles/index", {articlesList: articles});
	    });
});

app.get('/articles/new', function(req,res) {
  res.render('articles/new');
});

app.post('/articles', function(req,res) {
	db.Article
	    .create(req.body)
	    .then(function (article) {
			console.log(article);
	        res.redirect("/articles");
	    });
});

app.get('/articles/:id', function(req, res) {
	db.Article
	    .find(req.params.id)
	    .then(function (article) {
	      res.render("articles/article", {articleToDisplay: article});
	    });
})

app.get('/', function(req,res) {
	db.Article
	    .all()
	    .then(function (articles) {
	      res.render("site/index", {numArticles: articles.length});
	    });
});

app.get('/about', function(req,res) {
  res.render('site/about');
});

app.get('/contact', function(req,res) {
  res.render('site/contact');
});

app.listen(3000, function() {
  console.log('Listening on Port 3000 at localhost ...');
});
