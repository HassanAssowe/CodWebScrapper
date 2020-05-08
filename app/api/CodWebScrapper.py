import requests
import time, math, random
import hashlib, json

from tempfile import mkstemp
from shutil import move, copymode
from os import fdopen, remove

#TODO Generate a random ID and MD5 Hash it, package I use in nodejs is uniqid and then cryptoJS to hash it.
#TODO Make POST request to https://profile.callofduty.com/cod/mapp/registerDevice with said device ID
#TODO You will receive a authheader as a response
#TODO pass that and device id as headers to https://profile.callofduty.com/cod/mapp/login
#TODO Headers should be Authorization: bearer {authheader} and x_cod_device_id {deviceid}

defaultUri = 'https://my.callofduty.com/api/papi-client'  #Default URL, Requests originate from here.
global timestamp_start  #Timestamp_start of request
global timestamp_end  #Timestamp_end of request
global fireteam_data  #FUTURE STORAGE OF FIRETEAM ID's

session_requests = requests.session()

cookies = {
    'new_SiteId': 'cod',
    'ACT_SSO_LOCALE': 'en_US',
    'country': 'US',
    'XSRF-TOKEN': '68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041'
}

session_requests.headers.update({'content-type': 'application/json'})
session_requests.cookies.update(cookies)


def uniqid(prefix='', more_entropy=False):
    m = time.time()
    sec = math.floor(m)
    usec = math.floor(1000000 * (m - sec))
    if more_entropy:
        lcg = random.random()
        the_uniqid = "%08x%05x%.8F" % (sec, usec, lcg * 10)
    else:
        the_uniqid = '%8x%05x' % (sec, usec)

    the_uniqid = prefix + the_uniqid
    return the_uniqid


#_________________________________________________________________________________________________________________


def generateId():  #Generates a unique ID and MD5 Hashes it.
    deviceId = uniqid()
    result = hashlib.md5(deviceId.encode())
    return result.hexdigest()


def authenticate(
    email, password
):  #Retrieves session headers, (authheader and DeviceID) used to sign in
    deviceId = generateId()
    data = json.dumps({'deviceId': deviceId}, separators=(',', ':'))
    res = postReq("https://profile.callofduty.com/cod/mapp/registerDevice",
                  data)
    output = res.content.decode()
    json_obj = json.loads(output)
    if json_obj['status'] != 'success': return print("Could not authenticate.")
    authHeader = json_obj['data']['authHeader']
    session_requests.headers.update({
        'Authorization': 'bearer %s' % authHeader,
        'x_cod_device_id': deviceId
    })
    status = login(email, password)
    return status


def login(
    email, password
):  #Logs into https://profile.callofduty.com/ with credentials. Allowing for requests.
    data = json.dumps({
        "email": email,
        "password": password
    },
                      separators=(',', ':'))
    res = postReq("https://profile.callofduty.com/cod/mapp/login", data)
    output = res.content.decode()
    json_obj = json.loads(output)
    if json_obj["success"] != True:
        return "Fail"       
    else:
        return "Success" 
    session_requests.cookies.update({
        'rtkn':
        json_obj["rtkn"],
        'ACT_SSO_COOKIE':
        json_obj["s_ACT_SSO_COOKIE"],
        'atkn':
        json_obj["atkn"]
    })

    # user = input("Enter Battle.Net Account (I.E. John%12345): ")
    # user = user.split('%')[0] + '%23' + user.split('%')[
    #     1]  #All 'battle' requests need to have 23 before accountID.
    # getLatestMatch(user, "battle")  #An Example request.


#______________________EXAMPLE STAT PULL REQUESTS__________________________________________________________________


def getLatestMatch(gamertag,
                   platform):  #Retrieves latest game played from user.
    try:
        result = getReq(
            '{}/crm/cod/v2/title/mw/platform/{}/gamer/{}/matches/mp/start/0/end/0/'
            .format(defaultUri, platform, gamertag))
        #result = getReq('{}/stats/cod/v1/title/mw/platform/{}/gamer/{}/profile/type/mp'.format(defaultUri, platform, gamertag))
        #result = getReq('{}/crm/cod/v2/title/mw/platform/{}/gamer/{}/matches/mp/start/0/end/0/details'.format(defaultUri, platform, gamertag))
        JSON = json.loads(result.content.decode())
    except:
        print("An Error has occured.")

    for items in JSON["data"]:
        print('MatchID: {} \nTimestamp: {}\nMap: {}\nGamemode: {} \n'.format(
            items.get('matchId'), items.get('timestamp'), items.get('map'),
            items.get('type')))
        timestamp_start = items.get('timestamp')
        break

    dataStorage(gamertag, timestamp_start)
    getLatestMatchStats(gamertag, "battle", timestamp_start)


def getLatestMatchStats(gamertag, platform,
                        timestamp):  #Retrieves match stats from match.
    result = getReq(
        '{}/crm/cod/v2/title/mw/platform/{}/gamer/{}/matches/mp/start/{}/end/0/details'
        .format(defaultUri, platform, gamertag, timestamp))
    JSON = json.loads(result.content.decode())
    stat = JSON["data"]["summary"]["all"]
    print(
        'Player ID: {}\nkills: {}\ndeaths: {}\nkdRatio: {}\nscore: {}\nscorePerMinute: {}\n'
        .format(gamertag, stat.get('kills'), stat.get('deaths'),
                stat.get('kdRatio'), stat.get('score'),
                stat.get('scorePerMinute')))
    #print(JSON["data"]["summary"]) Use This for JSON of All Possible stats.


def dataStorage(
        gamertag,
        timestamp):  #Stores latest timestamp of searched user in a .dat file.
    file_path = 'Player_Data.dat'
    fh, abs_path = mkstemp()

    try:
        with fdopen(fh, 'r+') as new_file:
            with open(file_path) as old_file:
                for line in old_file:
                    if (gamertag in line):
                        print("User Found, Updating Data")
                        new_file.write(
                            line.replace(
                                line.split("\t")[1],
                                str(timestamp) + "\n"))
                    elif (gamertag not in line):
                        new_file.write(line)
                    elif (gamertag not in line and os.getsize(file_path) == 0):
                        print("User Not Found, Adding Data")
                        new_file.write('{}\t{}\n'.format(gamertag, timestamp))

        copymode(file_path, abs_path)
        remove(file_path)
        move(abs_path, file_path)
    except:
        print("An Error has occured")


def getReq(url):  #getRequests
    result = session_requests.get(url)
    return result


def postReq(url, data):  #postRequests
    result = session_requests.post(url, data=data)
    return result


# # TERMINAL COMMANDS--------------------------------------------------------------------------------------------------
# email = input("Enter a https://my.callofduty.com email: ")
# password = input("Enter Password: ")
# authenticate(email, password)
