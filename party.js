var url = 'https://api.meetup.com/2/open_events',
    api = '25761a5a345a4f53585f6e5427c5917';

var d = new Date();
var dat = d.getTime();
var week = 24 * 7 * 60 * 60;
var enddat = dat+week;
var category = 34,
    country = 'US',
    state = 'NY',
    city = 'Brooklyn',
    radius = 2,
    time = ''+dat + ", "+enddat;

var fs = require('fs');
var htmlcompl = '';

var request = require('request');
request({
    url: url,
    qs: {'key': api, 'country': country, 'category': category, 'state': state, 'city ': city, 'radius': radius},
    method: 'GET'

}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        var response = JSON.parse(body);
        if (response['results'].length > 0){
            for (index = 0; index < response['results'].length; ++index) {
                if ('venue' in response['results'][index] && 'description' in response['results'][index]){
                    var tim = new Date(response['results'][index]['time']);

                    htmlcompl += '<h1>' + response['results'][index]['name']+ '</h1>' + ' \n' +
                        '<h3>' + ' Adress: ' + response['results'][index]['venue']['city'] +
                        ', ' + response['results'][index]['venue']['address_1'] + '</h3>' +'</h3>' + '\n' +
                        response['results'][index]['description']+ '\n' + '<h3>' + tim.toString() + '</h3>' +
                        '\n' + '------------\n';
                }
            }
            fs.writeFileSync('test.html', htmlcompl);
        }

    }

});
