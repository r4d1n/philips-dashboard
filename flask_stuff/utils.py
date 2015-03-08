import json
import requests
import pdb
import subprocess
import os
from pprint import pprint

# login
BASE_PATH = "https://gateway.api.pcftest.com:9004/v1/fhir_rest/"
def auth_and_login(username, password): 
    # get oauth
    url = "https://gateway.api.pcftest.com:9004/v1/oauth2/token?grant_type=client_credentials"

    headers ={
            'Authorization': "Basic WWROdUNpNld5QTRrWjBhSGRodTRVakcxWTc3OThOS3c6aWlQQ2NVa3Fra1NvYXMxSA==",
    }
    
    print 'sending post to get token...'
    
    r = requests.post(url, headers=headers)

    print 'logging in....'

    d = json.loads(r.text)
    access_token = d['access_token']
    headers2 = {
            'Authorization': "Bearer {}".format(access_token),
            'content-type': 'application/json',
    }


    # login
    url_login = "https://gateway.api.pcftest.com:9004/v1/oauth2/authorize/login?"
    payload = {'username': username, 'password': password}
    payload_json = json.dumps(payload)
    r = requests.post(url_login, headers=headers2, data=payload_json)#json.dumps(payload))
    
    print 'finished logging in...'
    return access_token

def make_request_patient(headers, path, patient_id, metric_format, metric_type, loinc_id, username, count=10):
    url = BASE_PATH #
    other_stuff = '{path}?subject._id={patient_id}&name={metric_format}&_sort:asc=date&_count={count}&_format=json&_pretty=true'.format(
        path=path, patient_id=patient_id, metric_format=metric_format, count=str(count))
    url_query = url + other_stuff
    print url_query
    r = requests.get(url_query, headers=headers)
    d = json.loads(r.text)
    
    entries = d['entry']
    print 'found %s entries for loinc_id=%s' %(len(entries), loinc_id)
    if metric_type in METRIC_TYPE_TO_METHOD:
        METRIC_TYPE_TO_METHOD[metric_type](entries)
    else:
        parse_metric(entries, metric_type, username) #username is the directory lawls.


def parse_metric(entries, metric_type, directory):
    # takes josn dictionary
    #pdb.set_trace()
    if entries:
        print entries[0]
        datum = []
        for i in range(len(entries)):
            #2014-01-01T13:18:00-05:00
            #print d['entry'][i]['content'].keys()
            date_str = entries[i]['content']['appliesDateTime']
            date_str = parse_date_hack(date_str)


            quant = entries[i]['content']['valueQuantity']
            units = quant['units']
            value = quant['value']
            string = '%s %s' %(value, units)
            length = 20
            d = {}
            d['time'] = date_str
            d['value'] = value
            d['units'] = units
            d['metric_type'] = metric_type
            #print date_str + ' '*(length-len(string)) + string
            datum.append(d.copy())
        # = json.dump(datum, '%s.txt' %(metric_type))
        with open('%s/%s.json' %(directory, metric_type), 'wb') as fp:
            json.dump(datum, fp, sort_keys=True, indent=2, separators=(',', ': '))
    else:
        print '\n\n\nno entries found...\n\n\n'

def parse_date_hack(date_str):
    date_strings = date_str.split('-05:00')[0].split('T')
    date_str = '%s %s' %(date_strings[0], date_strings[1][:-9])
    return date_str

METRIC_TYPE_TO_METHOD = {
    # 'weight': parse_weight,
    # 'bp': parse_bp,
    # 'hr': parse_weight,
    # 'pain': parse_weight,
    # 'hrr': parse_weight,
}