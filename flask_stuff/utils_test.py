import utils


from optparse import OptionParser
L = 'http://loinc.org'
R = 'https://rtmms.nist.gov'
METRIC_TO_PARAMS = {
    'weight': (L, '3141-9'), 
    #'bp': ('https://rtmms.nist.gov','150016'), Bp is tricky cuz there's 3.
    'temp': (L,'8310-5'),
    'SPO2': (L,'59408-5'),
    'hr': (L,'8867-4'), #pressure
    'hr2': (L, '8889-8'), #oximeter
    'pain': (R,'67108866'),
    'hemo': (L, '4548-4'),
    'sbp': (R, '150017'), #Systolic Blood Pressure -> GOOD
    'sbp2': (R, '150018'), #Diastolic Blood Pressure -> GOOD
    'steps': (R, '8454247'), #Steps This is complicated... don't use this lawl.
    'sleep': (R, '8455148'), # good

    'mood': (L, '52497-5'),
    'energy': (R, '8454263'),
    'prothtime': (R, '160260'),
    'sleep_eff': (R, '67108866'),
    'glucose': (L, '2339-0'),
}


USER_TO_PASS = {
    'a101': ('sam.s.smith', 'MyFood4Health!'),
    'a102': ('nancy.anderson', 'OneHabit,2beU'),
    'a103': ('charlie.miller', '1ce.Upon.a.Time'),
    'a104': ('mark.taylor', 'Going4ther$'),
    'a105': ('karen.young', 'What1This?'),
}
def main():

    parser = OptionParser()
    parser.add_option('-t', dest='type', help='Enter metric type')
    parser.add_option('-u', dest='username',
                      help='Enter username.',
                      default=2)
    parser.add_option('-c', dest='count',
                      help='Count',
                      default=10)
    (options, args) = parser.parse_args()
    username, password = USER_TO_PASS[options.username]
    print 'calling auth_and_login....'
    access_token = utils.auth_and_login(username, password)
    print access_token
    headers_new = {
        'Authorization': "Bearer {}".format(access_token),
        'Accept': 'application/json',
    }


    path = 'Observation'
    metric_url, id_num = METRIC_TO_PARAMS[options.type]
    print 'making request for %s data on %s (id=%s)' %(USER_TO_PASS[options.username], options.type, id_num)
    utils.make_request_patient(headers_new, path, options.username, '%s|%s'%(metric_url, id_num), options.type, id_num, options.username, options.count)



if __name__ == '__main__':
    main()