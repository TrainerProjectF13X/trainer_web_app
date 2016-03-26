#This is a file intended to make the seeding of the database easier and quicker

#Written by Christopher Ogle on 3/25/2016

#If modified please fill out below so that other users may know what changes occured
#In addition please follow the syling guidlines as shown below
'''Modefied on'''

import os, django, argparse, hashlib, time
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trainerproject.settings")
django.setup()

from django.contrib.auth.models import User
from users.models import TrainerAccount, RegularAccount, TrainerAskUserToken, UserAskTrainerToken



class SeedDatabase(object):


    CONST_DOT_COM =         ".com"
    CONST_BASE_USERNAME =   "test_"
    CONST_USER_PASSWORD =   "testing123"
    CONST_BASE_LASTNAME =   "Wang"
    CONST_BASE_FIRSTNAME =  "test_account_"
    CONST_BASE_USER_EMAIL = "null@null_"

    def __init__(self, debug, verbose):
        self.debug = debug
        self.verbose = verbose

    def main(self):
        num_user_accounts = int(input("How many user accounts do you want to create in total? "))
        self.create_user(num_user_accounts)

    def create_user(self, num):
        all_users = User.objects.all()
        #Not a single user to be found
        if not all_users:
            start = 0
        else:
            start = User.objects.order_by('-id')[0].id + 1

        for i in range(0, num):
            while True:
                hex_dig = hashlib.sha224(str(self.CONST_BASE_USERNAME + str(start)).encode('utf-8') +
                                         str(self.CONST_BASE_USER_EMAIL+str(start)).encode('utf-8') +
                                         str(time.time()).encode('utf-8')).hexdigest()

                if not TrainerAccount.objects.filter(auth_token=hex_dig).exists() and not RegularAccount.objects.filter(auth_token=hex_dig).exists():
                    break;

            user = User.objects.create_user(username=str(self.CONST_BASE_USERNAME + str(start)),
                                            email=str(self.CONST_BASE_USER_EMAIL + str(start) + self.CONST_DOT_COM),
                                            password=str(self.CONST_USER_PASSWORD),
                                            first_name= str(self.CONST_BASE_FIRSTNAME + str(start)),
                                            last_name= str(self.CONST_BASE_LASTNAME))
            user.save()
            start =  start + 1

if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument('-d','--debug', action='store_true', default=False)
    parser.add_argument('-v','--verbose', action='store_true', default=False)

    args = parser.parse_args()

    run_instance = SeedDatabase(args.debug, args.verbose)
    run_instance.main()
