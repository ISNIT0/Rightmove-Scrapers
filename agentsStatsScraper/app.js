var cheerio = require('cheerio');
var db = require('mongojs').connect('test',['rightmoveAgents','rightmoveAgentsStats']);
var request = require('request');

console.log('Started!');




db.rightmoveAgents.find({}, function(error, value){
  value.map(function(value, index){
    request('http://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=BRANCH^'+value.rightmoveAgencyCode, function(err, resp, body){
      if(body){
        $ = cheerio.load(body);
        console.log(value.name,value.rightmoveAgencyCode);
        db.rightmoveAgentsStats.insert({
          name:value.name,
          totalProperties:$('#resultcount').text()
        });
      }
    });
  });
});
