
## Steps to Set Up the Project Locally :notebook: 


The backend components of our project can be found in the server folder. The server.js file is used to make a connection between the frontend and backend. To run this project on your machine, the first thing that needs to be done is make sure that you have installed all of our node_modules. To do this, go into the terminal and enter the ../server directory. Then run the command 'npm install'. This will install all of the backend tools that are mentioned in our package and package-lock files. Next, modify the value of origin to http://localhost:<your-frontend-port>. This file is also used for the messaging aspect of the app as well as setting up the backend to listen on a port. The port can be set up within the .env file, if it is not, a default port of 8080 is used. 

Another important aspect of the backend is setting up the database. Our project uses a MySQL connection. The username and password of your database can be put directly into this file, however, we highly recommend putting your username and password in the .env file as it is ignored and will not be updated every time changes are made to the project. You can also provide your own database name and port in the .env file, if not, 390db and 3306 are the defaults used respectively.

The last step of setting up the backend is done in the app.js file. There are some variables that use our default http://localhost:3000, if you are using a different port for your front end, use your port name instead of 3000.
  
Once all of this is done, the server can be started by entering the ../server directory in the terminal and using the command 'npm start'.

## Backend Code Explanation :notebook: 
As for where the backend code can actually be found, we have separated all of the backend code into the Controllers folder. This folder contains files for different functionalities/users. For example, the ScheduleController.js file contains the code that will be used for implementing the doctor’s schedule as well as how the patient will see the schedule information. User specific classes such as DoctorController contains backend code that will only apply to unique doctor functionalities. At the end of each file, a line can be found that exports the file. This can then be used within the app.js file found within the server folder. 

The app.js folder imports all of the Controller files by writing lines that look like the following:
const <Controller_Class_Name> = require(“./Controllers/<Controller_Class_Name>”);
This allows the files to be imported before being used in the following line of code so that the app can run our backend code: 
app.user(<Name_Of_Const_Created_Above>);

All of the backend files use a tool called Axios to fulfill http requests. Axios allows the user to get, post, put, or delete data. Every Axios function consists of a request and a response. The request is the data that we are being sent from the frontend in json format. The data that is sent as the request can be assigned to variables so that they can be used within our database queries to either retrieve, modify, insert, or delete information. The response is what will be sent back to the front end to use after the function has been completed. Depending on what the function does, different values will be sent back to the front end. If the method is used to delete, insert, or modify data, the response will send some text indicating that the process was completed. However, if the method is used to retrieve data from the database, the response will send the result of the query.

Our queries have been written with a prioritization on cleanliness and being uniform. Instead of writing the query directly in the db.query function, we write it in a string above and then use the string within the function. This is because if the query gets long, it will be harder to read the parameters that db.query is taking in. A minimum of two lines of comments accompany each query to improve our understandability of the queries. The first line lists what we have dubbed the ‘parameters’ of the query. The parameters are simply the data that will be taken from the front end to be used in the query. The second line is called ‘returns’ and simply indicates the different data that will be sent back to the user (ex. DoctorID, Status, etc.).

## Testing Explanation :notebook: 
  
The testing of the backend functions can be found in ../client/src/__tests__/API_methods.test.js. The tests that we have written test our API_methods. This is done by calling the API method and asserting that a status code of 200 is received. This indicates that the method ran successfully and a response has been received. To run these tests, open the terminal, go to the directory  ../client/src/__tests__ and execute the command 'npm test API_methods.test.js'.
