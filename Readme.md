# Yatodo
Yet Another Todo app

This is another Todo web app which uses Spring for the API and AngularJS 2 for the 
frontend. 

Click [here](http://52.57.161.17/) for a running demo.


## Running

Each part can be ran individually. Refer to the READMEs inside the api project and the 
frontend project for further documentation. 

### Running With Docker

Inside the main repository is a `docker-compose.yml` file which will build the entire
application including frontend and backend. Simply run the following command to to bring the 
entire application:

```
$ docker-compose up --build`

```


## Usage

![Alt text](/../documentation/screenshots/screenshot1.png?raw=true "Home Screen")
The concept is to manage your todos in an efficient way. There are single todo items,
and group items. The user creates an account and logs in so that the application can store
their personal todos. Once logged in, simply add todos to the main list or create new groups
in order to add to personalized groups. Once a todo is done, simply check it off and it is
moved to the completed section.
