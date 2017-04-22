 #!/bin/bash  

#Backend Build
cd api/
gradle build -x test

#Backend Build
cd ../frontend/
ng build --env=prod

cd ..
docker-compose up --build -d

