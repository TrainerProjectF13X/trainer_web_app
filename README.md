


#Set up Django

1. Install PIP

 *$easy_install pip*

2. Install VirtualEVN via PIP

 *$pip install virtualenv*


#Set up dependencies whithin the virtual enviroment

The following README assumes that you have virtualenv and python 3.4.x installed.
In this README.txt the following symbol, >>, denotes command line input.

## Clone the repo
The first step is to clone the repository from the following address:
https://github.com/TrainerProjectF13X/trainer_web_app.git


##Start the virtual Env

1.In order to do so run the following command:

*$sudo virtualenv -p [path to python3.4.x] [path to cloned repo]*

Eg. sudo virtualenv -p python3 .


2. Now change your directory into the cloned repository.

Now in order to run this project for the first time type into 
the command line the following:

*$source bin/activate*



3. Running this command should have changed your terminal prompt, and you
should now be in the virtual enviroment.

Now run the following, still in the same directory.

* $pip install -r requirements.txt *


4. Migrate the database
  *$python manage.py makemigrations
  *$python manage.py migrate


5. runserver

*$python manage.py runserver*



===============================================================================================
If you get and error like this run the following command 

Command "/usr/bin/python -u -c "import setuptools, tokenize;__file__='/tmp/pip-build-44VQfW
/psycopg2/setup.py';exec(compile(getattr(tokenize, 'open', open)(__file__).read().replace('\r\n', '\n')
, __file__, 'exec'))" install --record /tmp/pip-46Ysyb-record/install-record.txt 
--single-version-externally-managed --compile" failed with error code 1 in /tmp/pip-build-44VQfW/psycopg



*$sudo apt-get install libpq-dev python-dev*
And then retry.


This should install all the dependencies needed in order to run the project. 
If you add any please update the file accordingly.
