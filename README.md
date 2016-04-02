#General

  1. The first part of readme covers how to [set up the Django](#djangosetup) virtual environment and local host
  2. The second part of the readme goes into detail on how to [configure the webpack](#webpack) 
  3. The third part describes some [configuration errors](#errors) one might encounter
  4. The last part is a [API cheatsheet](#api)

=====================================================================================================
#<a name="djangosetup"></a>Running the virtual environment/local server

###Set up Django

1. Install PIP

  *$easy_install pip*

2. Install Virtual environment via PIP

  *$pip install virtualenv*


###Set up dependencies within the virtual environment

The following README assumes that you have virtualenv and python 3.4.x installed.
In this README.txt the following symbol, >>, denotes command line input.

###Clone the repo
The first step is to clone the repository from the following address:
https://github.com/TrainerProjectF13X/trainer_web_app.git


###Start the virtual Env

1. Configure the virtual environment

  *$sudo virtualenv -p [path to python3.4.x] [path to cloned repo]*
  Eg. sudo virtualenv -p python3 .


2. Now change your directory into the cloned repository and activate the virtual environment

  *$source bin/activate*



3. you should observe you are in a virtual environment, install all dependencies via following command


  *$pip install -r requirements.txt*


4. Migrate the database
  For a working copy, you can simply use a sqllite Database instead of Postgre by replacing the code of database in setting.py by the following


            
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
            }
        }


  * *$python manage.py makemigrations*
  * 
  * *$python manage.py migrate*

5. runserver

  * *$python manage.py runserver*
  

======================================================================

#<a name=webpack"></a>Webpack compiler configuration (via npm)

  Deactivate the VirtualEnv if you are inside virtualenv

1. Install HomeBrew
   * $/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2. Install Node
   * $Brew node

   

---------------------------------------------------
##### *NOW STEP BACK TO THE VIRTUAL ENV& cd the the project folder*
--------------------------------------------------



3. Use NPM to Install packages

   * $npm init
   * $npm install

4. Compile 

   * ./node_modules/.bin/webpack --config webpack.config.js
   * [WIth WATCH]./node_modules/.bin/webpack --config webpack.config.js --watch


===============================================================================================

#<a name="errors"></a>Possible configuration errors

###If you get and error like this run the following command 

Command "/usr/bin/python -u -c "import setuptools, tokenize;__file__='/tmp/pip-build-44VQfW
/psycopg2/setup.py';exec(compile(getattr(tokenize, 'open', open)(__file__).read().replace('\r\n', '\n')
, __file__, 'exec'))" install --record /tmp/pip-46Ysyb-record/install-record.txt 
--single-version-externally-managed --compile" failed with error code 1 in /tmp/pip-build-44VQfW/psycopg



  *$sudo apt-get install libpq-dev python-dev*
  And then retry.


This should install all the dependencies needed in order to run the project. 
If you add any please update the file accordingly.
### Permission errors

* Please add sudo to commands like pip install -r requirments if encounter a permission error
* Be aware of of the fact that sudo is going to change the file permission setting


python manage.py loaddata data_dump.json

=============================================================================

#<a name="api"></a>API Guidelines for Front-End folks
    ###notes

    * Assuming authenticated for right now
    * Post request to come

1. Get user related information 
-----
Get Request to /api/get_user

Sample Response

{"id": 1, "level": "TRAINER", "auth_token": "10d89d4cabf1a5eb983ef8a90ef48c23971fc9d40ffe9acfad07d357", "user": {"email": "cdzengpeiyun@gmail.com", "username": "ss", "first_name": "ss", "last_name": "ss"}, "clients": [{"user": {"email": "thecogle@gmail.com", "username": "Cogle", "first_name": "Christopher", "last_name": "Ogle"}, "profile": "User Profile", "goal": "Goal", "profile_pic": null}], "past_experience": "Past Experience", "profile_pic": null}



2. Get workouts info
----
Get Reqeust to workout_api/get_userwithworkouts

Sample Response

{"user": {"email": "cdzengpeiyun@gmail.com", "username": "ss", "first_name": "ss", "last_name": "ss"}, "workouts": [{"overview": "Crazy Workout", "activities": []}, {"overview": "Standard Workout", "activities": [{"name": "Cardial Burning", "detail": "run for 100 miles"}, {"name": "Weight Lifting", "detail": "Do you even Lift?"}]}]}
