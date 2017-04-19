 #!/bin/bash  

#Backend Build
cd api/
gradle build -x test
cp ./build/libs/yatodo-0.0.1.jar src/main/docker/

#Backend Build
cd ../frontend/
ng build --env=prod

cd ..
docker-compose up --build -d

