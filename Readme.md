# Yatodo
Yet Another Todo app

This is another Todo web app which uses Spring for the API and AngularJS 2 for the 
frontend. 


## Running

Each part can be ran individually. Refer to the READMEs inside the api, and 
frontend project for further documentation. 

### Running With Docker

Inside the main repository is a `docker-compose.yml` file which will build the entire
application including frontend and backend. Simply run the following command to bring up the 
entire application:

```
$ docker-compose up --build

```


## Usage

![Alt text](/../features/documentation/screenshots/screenshot1.png?raw=true "Home Screen")
The concept is to manage your todos in an efficient way. There are single todo items,
and group items. The user creates an account and logs in so that the application can store
their personal todos. Once logged in, simply add todos to the main list or create new groups
in order to add to personalized groups. Once a todo is done, simply check it off and it is
moved to the completed section.
