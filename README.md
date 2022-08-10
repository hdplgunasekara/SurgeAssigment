# SurgeAssigment
This project developed using MERN Technology 

Click the following link to see UI designs of the application-
https://www.figma.com/file/R7bRDyhY7eAqLo4P41nYN2/pas?node-id=0%3A1



This application have docker integrated. Install docker first

* [For ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [For macOS](https://docs.docker.com/docker-for-mac/install/)
* [For windows](https://docs.docker.com/docker-for-windows/install/)

clone this repo to your system

```
git clone https://github.com/hdplgunasekara/SurgeAssigment.git
```

Then go to root folder

```
cd SurgeAssigment
```

Now go inside backend folder and open .env file.Then uncomment "USER" and "PASS" variables and add your gmail and gmail app password.(Refer the  article in following link to find how to get the password)

https://support.google.com/accounts/answer/185833?hl=en


Afterwards for starting the development server make sure that you are in the root of the project(SurgeAssigment) and then type

```
docker-compose up
```

The default port of the nodejs application is `8090`.
The default port of the reactjs application is `3000`.
The default port of the mongo db is `27017`.

Now everything is fine and your application will run smoothly !!!!

If you want to seed a dummy admin to your database go to backend folder then type

```
npm run seed
```

If it fails to connect database then go to your backend container

```
docker exec -it <backend container id> bash
```

You can find your backend container id by typing

```
docker ps
```


Then run npm run seed inside it it will seed one admin to database

```
npm run seed
```

Admin email = `admin@gmail.com`
Admin Password = `Admin1234`

If you want exit from docker container type 

```
exit
```

Now you can log in using above admin credentials.


If you want to run backend unit testing go to backend folder and type 

```
npm test
```
(If it doesn't run go inside the backend container and type above command)


If you want to run frontend unit testing go to frontend folder and type 

```
npm test
```
(If it doesn't run go inside the frontend container and type above command)

If you want to stop running project type 

```
docker kill <backend-container-d> <fronted-container-d> <mongodb-container-d>
```

