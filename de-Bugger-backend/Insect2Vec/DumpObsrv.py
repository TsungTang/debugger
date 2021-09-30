import requests
import json
import datetime
import calendar
import pickle
import time


def add_months(sourcedate, months):
    month = sourcedate.month - 1 + months
    year = sourcedate.year + month // 12
    month = month % 12 + 1
    day = min(sourcedate.day, calendar.monthrange(year,month)[1])
    return datetime.datetime(year, month, day)


"""
longitude: 119.95 - 122.05
latitude: 21.85 - 25.35
"""

# x, y = 120.01, 25.30

t_start = datetime.datetime.strptime('2020-02-01', '%Y-%m-%d')
t_end = datetime.datetime.strptime('2021-09-01', '%Y-%m-%d')
x_start, y_start = 119.95, 21.85
x_end, y_end = 122.05, 25.35
# x_start, y_start = 120.77, 23.81
# x_end, y_end = 120.87, 23.91
dt = 30
dx, dy = 0.1, 0.1
url = "https://www.tbn.org.tw/api/v2/occurrence"

maps = dict()

t = t_start
while t <= t_end:
    x = x_start
    while x <= x_end:
        y = y_start
        while y <= y_end:
            params = {"boundedBox": "{},{} {},{}".format(y, x, y + dy, x + dx),
                      "eventDate": t.strftime('%Y-%m')}
            retry = 0
            try:
                data = json.loads(requests.post(url, params=params).text)['data']
            except:
                retry += 1
                if retry > 3:
                    continue
                else:
                    time.sleep(8)
            if retry > 3:
                print("(x, y) = ({}, {}); t = {} --> API no response".format(x, y, t.strftime('%Y-%m')))
            else:
                if len(data) > 0:
                    data = [{"Lat": obs["decimalLatitude"] if "decimalLatitude" in obs else 0.0,
                             "Long": obs["decimalLongitude"] if "decimalLongitude" in obs else 0.0,
                             "eventDate": obs["eventDate"] if "eventDate" in obs else t.strftime('%Y-%m-%d'),
                             "vernacularName": obs["vernacularName"] if "vernacularName" in obs else "",
                             "scientificName": obs["scientificName"] if "scientificName" in obs else ""} for obs in data]
                    if (t.year, t.month) not in maps:
                        maps[(t.year, t.month)] = dict()
                    if x not in maps[(t.year, t.month)]:
                        maps[(t.year, t.month)][x] = dict()
                    maps[(t.year, t.month)][x][y] = data
                print("(x, y) = ({}, {}); t = {} --> returned {} data".format(x, y, t.strftime('%Y-%m'), len(data)))
            y += dy
        x += dx
    pickle.dump(maps[(t.year, t.month)], open("maps_{}.pkl".format(t.strftime('%Y-%m')), 'wb'))
    t = add_months(t, 1)

pickle.dump(maps, open("maps.pkl", 'wb'))
