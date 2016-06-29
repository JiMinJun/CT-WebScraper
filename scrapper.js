var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var books = [];
request('https://origin-web-scraping.herokuapp.com/', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var HTML = cheerio.load(body);
        HTML('.panel').each(function(i, element) {
        	var name = HTML(this).children().first().text().replace(/(\n)/, '').trim();
        	var imageUrl = HTML(this).children().eq(+1).children('img').attr('src');
        	var author = HTML(this).children().children('p').text();
        	var price = HTML(this).children().children('.green').text();
        	var book = {
        		'name' : name,
        		'imageUrl' : imageUrl,
        		'author' : author,
        		'price' : price
        	};
        	books.push(book);
        });
    }
    fs.writeFile('books.json', JSON.stringify(books, null, 2), function(err) {
        console.log(err);
    });
});


