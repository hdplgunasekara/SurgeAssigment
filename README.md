# SurgeAssigment
This project developed using MERN Technology 

Click the following link to see UI designs of the application-
https://www.figma.com/file/R7bRDyhY7eAqLo4P41nYN2/pas?node-id=0%3A1

About App - 

Admin can login using right credentials .Frontend and backend validation had been  created for login process.According to the account type admin can see the admin dashboard .
An admin can add new users and see existing users.If he wants to add a new user he has to enter the email of new user and the email will be validate by both backend and fronted .Afterwards a temporary password will be sent to that particular email address .That temporary password is stored in the database and the status of the new student is mentioned as  'false' .
Admin can see the users of the system .Only the email will be shown if the user profile is not completed yet.
    
Student must login using the email and the temporary password .And it will consider as the first login.Still the status is false.Then the student will redirect to a page where he has to complete the profile.This action is compulsary .And each field is validated by both backend and frontend .If all the details are correct the student will be added as a new user to the system .Afterwards  he can login as a student and he can add notes.Title and the description must be filled to add a new note.Furthermore he can update and delete notes

JWT authentication has been used in both frontend and backend .Frontend routes are protected by account type and JWT token. Backend routes are  protected by JWT token..Users can be searched by first name,last name ,email and Id.Pagination has been  added to both backend and frontend



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


App Screenshots

![image](https://user-images.githubusercontent.com/66919299/183995767-b57395d6-4d65-4e92-935d-c3a58cd060d4.png)

![image](https://user-images.githubusercontent.com/66919299/183996124-34413078-6eff-4cfd-b660-ce995881c419.png)

![image](https://user-images.githubusercontent.com/66919299/183996285-5fb95a9f-6d28-40a7-b82d-84858bb7735f.png)

![image](https://user-images.githubusercontent.com/66919299/183996361-46351c42-a910-4085-ae25-b3a46bd8e954.png)

![image](https://user-images.githubusercontent.com/66919299/183996710-08edbe3c-c0b7-4814-abd7-2f52b9fce608.png)

![image](https://user-images.githubusercontent.com/66919299/183997774-a5b0f382-b128-4dca-89e1-2e4adfa29891.png)

![image](https://user-images.githubusercontent.com/66919299/183997919-2501209c-4408-483c-8551-632fc20fbb21.png)


