import requests
import datetime
import json

SITE = 'https://api.meetup.com/2/open_events'
API = '25761a5a345a4f53585f6e5427c5917'


DATE = datetime.datetime.now().toordinal() * 24 * 60 * 60
week = 24 * 7 * 60 * 60

CATEGORY = 34
COUNTRY = 'US'
STATE = 'NY'
CITY = 'Brooklyn'

params = {
    'key': API,
    'country': COUNTRY,
    'state': STATE,
    'radius': 1,
    'city': CITY,
    'order': 'time',
    'category': CATEGORY,
    'time': str(DATE) + ", " + str(DATE) + str(week)}

r = requests.get(SITE, params=params)
j = json.loads(r.text)

f = open('html.html', 'w', encoding='utf-8')
if j['results']:
    f.write('Url: ' + str(r.url) + '<hr/>')
    for i in j['results']:
        if i.get('venue')  and i.get('description'):
            message = '<h1>' + str(i['name']) + '</h1>' + \
                      '<h3>' + ' Adress: ' + i['venue']['city'] + ', ' + i['venue']['address_1'] + '</h3>' + '\n' + i[
                          'description'] + '\n' + '<h3>' + str(
                datetime.datetime.fromtimestamp(int(i['time']) / 1e3)) + '</h3>' + '\n' + '------------\n'
            f.write(message)
    print('lucky')
else:
    f.write('empty')
    print('empty')
f.close()
