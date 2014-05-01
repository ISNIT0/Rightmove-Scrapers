var cheerio = require('cheerio');
var db = require('mongojs').connect('test',['rightmoveAgents','rightmoveAgentsDetails']);
var request = require('request');

console.log('Started!');




db.rightmoveAgents.find({}, function(error, value){
  value.map(function(value, index){
    request('http://www.rightmove.co.uk.nyud.net'+value.url, function(err, resp, body){
      if(body){
        $ = cheerio.load(body);
        console.log($('#pageheader h1').text());
        db.rightmoveAgentsDetails.insert({
          name:$('#pageheader h1').text(),
          address:$('.address').text().replace('\n','').replace('\t',''),
          phone:$('.phone').text().replace(/\D/g,'')
        });
      }
    });
  });
});

//console.log($('#pageheader h1').text(),$('.address').text(),$('.phone').text().split(':')[1].split(' ')[1]+$('.phone').text().split(':')[1].split(' ')[2])
