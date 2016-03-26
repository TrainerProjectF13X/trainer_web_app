#This is a file intended to make the seeding of the database easier and quicker

#Written by Christopher Ogle on 3/25/2016

#If modified please fill out below so that other users may know what changes occured
#In addition please follow the syling guidlines as shown below
'''Modefied on'''

import os, django, argparse, hashlib, time, random
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

    def __init__(self, args):
        self.debug = args.debug
        self.verbose = args.verbose
        self.assign = args.assign_only

    def main(self):
        user_list = []
        num_user_accounts = int(input("How many user accounts do you want to create in total? "))
        if num_user_accounts == 0: return
        self.create_user(num_user_accounts, user_list)
        num_trainer_accounts = num_user_accounts + 1
        while not num_trainer_accounts <= num_user_accounts:
            num_trainer_accounts = int(input("How many trainer accounts do you want to create in total? "))

        user_list = self.create_trainer(num_trainer_accounts, user_list)
        self.create_reglr_user(user_list)
        self.assign_trainer_user()

    def create_user(self, num, ul):
        all_users = User.objects.all()
        #Not a single user to be found
        if not all_users:
            start = 0
        else:
            start = User.objects.order_by('-id')[0].id + 1

        for i in range(0, num):
            user = User.objects.create_user(username=str(self.CONST_BASE_USERNAME + str(start)),
                                            email=str(self.CONST_BASE_USER_EMAIL + str(start) + self.CONST_DOT_COM),
                                            password=str(self.CONST_USER_PASSWORD),
                                            first_name= str(self.CONST_BASE_FIRSTNAME + str(start)),
                                            last_name= str(self.CONST_BASE_LASTNAME))
            user.save()
            ul.append(user)
            start =  start + 1

    def create_trainer(self, num, ul):
        trainer_list = random.sample(range(0,len(ul)), num)
        for i in trainer_list:
            trainer = TrainerAccount.objects.create(user=ul[i],auth_token=self.create_token(ul[i]))
            trainer.save()
        ret = []
        count = 0
        for ele in ul:
            if count not in trainer_list:
                ret.append(ele)
            count  = count + 1
        return ret

    def create_reglr_user(self, ul):
        for user in ul:
            regular_user = RegularAccount.objects.create(user=user, auth_token=self.create_token(user))
            regular_user.save();


    def create_token(self, user):
        while True:
            hex_dig = hashlib.sha224(str(user.username).encode('utf-8') +
                                     str(user.email).encode('utf-8') +
                                     str(time.time()).encode('utf-8')).hexdigest()
            if not TrainerAccount.objects.filter(auth_token=hex_dig).exists() and not RegularAccount.objects.filter(auth_token=hex_dig).exists():
                break;
        return hex_dig

    def assign_trainer_user(self):
        assign = str(input("Would you like to assign a trainer a client\s? ")).lower()
        while "yes" in assign or "y" in assign:
            randomly = str(input("Would you like the program to randomly assign to first trainer IN DATABASE? (Yes or No) ")).lower()
            if "yes" in randomly or "y" in randomly:
                if not TrainerAccount.objects.all():
                    print("No trainers currently exist in the Database please create some and then rerun with assign option")
                    return
                else:
                    trainer = TrainerAccount.objects.all()[0]
                    free_users = RegularAccount.objects.filter(trainer=None)
                    if not free_users:
                        print("There are currently no free users please create some then rerun")
                        return
                    str(input("Out of {} unassigned accounts how many would you like to assign? ").format(len(free_users)))
            else:
                print("#TODO#")
            assign = str(input("Would you like to assign a trainer a client\s? ")).lower()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument('-a','--assign_only', action='store_true', default=False)
    parser.add_argument('-d','--debug',       action='store_true', default=False)
    parser.add_argument('-v','--verbose',     action='store_true', default=False)

    args = parser.parse_args()
    run_instance = SeedDatabase(args)
    if run_instance.assign:
        run_instance.assign_trainer_user()
    else:
        run_instance.main()
