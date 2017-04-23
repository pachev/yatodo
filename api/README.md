# Yatodo API

A [Spring][1] application that allows users create todo items and link them todo lists. This
application serves as an api for the angular 2 front end application.

**click [here][5] for a running demo of the swagger documentation**

## Running Application

*Note: default databse is in memory, but change application settings profile to `prod` for your own*

To run the application, you must first edit the `src/main/resources/application.properties` to your own
preference or leave it for defaults.  After the properties has been configured, run `gradlew.bat bootrun` on windows 
or `./gradlew bootrun` on a *nix* system. The application will run on localhost:8000

### run with Docker

Independently, you can run this application using [docker][2]  and [docker-compose][4]. 
After you've configured your properties, run:

```
$ ./gradlew build

```


there is already a docker-compose file included in the directory above repository. Simply run:

```
$ docker-compose up --build`

```

If you're using [docker-machine][4], the application is running on machine's-ip:8000, else it's on localhost:8000. 


## Usage

Once the application is running, there is swagger documentation on `[ip]:8000/swagger-ui.html`


## TODO
- Add Password encryption

[1]: https://spring.io
[2]: https://www.docker.com/
[3]: https://docs.docker.com/compose/
[4]: https://docs.docker.com/machine/
[5]: http://52.57.161.17:8000/swagger-ui.html
