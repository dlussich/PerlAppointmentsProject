For the steps described below I assumed that the user had the set up the enviroment correctly. It has an Apache Server and SQLite installed.
In the moment of testing both services should be running.

This are the steps to test the service:

1- Download the files 
2- Copy the pProject folder to the application root of your web server, in case it is Apache Server, copy the folder inside htdocs.
3- Open a web browser and type the url of your application server, i.e: http://localhost:80/pProject or http://yourServerAddress:yourPort/pProject 
4- Open the folder called /perl, your url should be:  http://localhost:80/pProject/perl
5- You will find 4 files (createDataBase.cgi, getAppointmentsService.cgi, postAppointment.cgi and appointments.db)
6- Click on the createDataBase.cgi file, it should show a message that says: Database successfully opened!
7- Go back with the browser's back arrow
8- Select and click ParentFolder, you should go back to: http://localhost:80/pProject/
9- Click the formPage.html page
10- There you will find some appointments listed, because I created them for testing purposes
11- If you click the button New it will show the form for inserting new appointments, if type something and click Search button it will filter results