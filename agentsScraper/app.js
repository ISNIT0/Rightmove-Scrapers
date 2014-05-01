var cheerio = require('cheerio');
var db = require('mongojs').connect('test',['rightmoveAgents']);
var request = require('request');

console.log('Started!');

getStuff = function(url, i, index) {
  console.log('Requesting Page ', i, index);
  request(url+i+'&index='+index, function(err, resp, body){
    console.log('Got Page ', i);
    $ = cheerio.load(body);

    $('.branchname a').each(function(index, value){db.rightmoveAgents.insert({name:$(value).text(), url:$(value).attr('href'), rightmoveAgencyCode:$(value).attr('href').split('.html')[0].split('-')[$(value).attr('href').split('.html')[0].split('-').length-1]})});

    if($('.pagecount').text().split(' ')[1]!=$('.pagecount').text().split(' ')[3]) {
      getStuff(url,i,index+10);
    } else {
      getStuff(url,i+1,0);
    }
  });
}

getStuff('http://www.rightmove.co.uk/estate-agents/find.html?locationIdentifier=OUTCODE^', 0, 0);
