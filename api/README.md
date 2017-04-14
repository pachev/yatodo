# Yatodo API

A [Spring][1] application that allows users create todo items and link them todo lists. This
application serves as an api for the angular 2 front end application.

## Running Application

*Note: default databse is in memory, but change application settings for your own

To run the application, you must first edit the `src/main/resources/application.properties.generic` to your own
preference or leave it for defaults.  After the properties has been configured, run `gradlew.bat bootrun` on windows 
or `./gradlew bootrun` on a *nix* system. The application will run on localhost:8000

### run with Docker

If you're into that kind of stuff, you can run this application using [docker][2]  and [docker-compose][4]. 
After you've configured your properties, run `./gradlew build`. Next, move the build file into the docker folder: 

`cp ./build/libs/clippr-0.1.0.jar src/main/docker/`

there is already a docker-compose file included in the directory above repository. Simply run:

`docker-compose up --build` optional `-d` to run in background. *todo: add here how to run single image*

If you're using [docker-machine][4], the application is running on machine's-ip:8080, else it's on localhost:8080. 


## Usage

*todo: add usage here or send link for swagger documentation trial*

## TODO
- Add Swagger2 Documentation
- Add Password encryption
- Add auto item/owner relationship

[1]: https://spring.io
[2]: https://www.docker.com/
[3]: https://docs.docker.com/compose/
[4]: https://docs.docker.com/machine/
