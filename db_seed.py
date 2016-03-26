#This is a file intended to make the seeding of the database easier and quicker

#Written by Christopher Ogle on 3/25/2016

#If modified please fill out below so that other users may know what changes occured
#In addition please follow the syling guidlines as shown below
'''Modefied on'''

import os, django, argparse

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trainerproject.settings")
django.setup()

from django.contrib.auth.models import User
from users.models import TrainerAccount, RegularAccount, TrainerAskUserToken, UserAskTrainerToken



class SeedDatabase(object):

    def __init__(self, debug, verbose):
        self.debug = debug
        self.verbose = verbose

    def main(self):
        print("Hello World")
        print(self.debug)
        print(self.verbose)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument('-d','--debug', action='store_true', default=False)
    parser.add_argument('-v','--verbose', action='store_true', default=False)

    args = parser.parse_args()
    print(args)
    run_instance = SeedDatabase(args.debug, args.verbose)
    run_instance.main()
