var cheerio = require('cheerio');
var db = require('mongojs').connect('test',['rightmoveCodes']);
var request = require('request');

console.log('Started!');

getStuff = function(i) {
    console.log('Requesting Page ', i);
    request('http://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=OUTCODE^'+i, function(err, resp, body){
	console.log('Got Page ', i);
	$ = cheerio.load(body);
	if($('#searchResultsInput').val()){
	    db.rightmoveCodes.insert({outcode:$('#searchResultsInput').val(),locationIdent:i});
	    console.log('On location Ident: ', i);
	    getStuff(i+1);
	} else {
	    console.log('Done! ', i);
	}
    });  
}

getStuff(1)
