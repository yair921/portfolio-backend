# UC-get-user-info microservice #

This is the microservice that allows you execute user case "get-user-info".

Languaje: nodejs v14.17.3

### How to deploy in AWS lambda? ###

Steps:

1. In the terminal, navigate to the project folder.
2. To install all dependencies required run --> npm install.
3. Compress in .zip file al files and folders including "node_modules".
4. Login in your AWS console, and go to lambda service.
5. Create new lambda service with nodejs version ^14.17.3.
6. In "Code" menu, click in "Upload-from" --> ".zip file", and select ".zip" file just created.
7. Go to "Configuration" menu, "General configuration" and set timeout to 29 seconds.
8. The next step require that you have a database information.
9. Go to "Configuration" menu, "Environment variables" and set environment variables describe it below:
    AWSSECRETKEY=<AWSSECRETKEY>
    AWSSECRETACCESSKEY=<AWSSECRETACCESSKEY>
    DBCONNECTOR=<LAMBDA-DB-CONECTOR-NAME>
    TWITTERCONNECTOR=<LAMBDA-TWITTER-CONECTOR-NAME>
10. In "Test" menu, create and save a test with the body decribe it below:
    { "user": { "twitterAccount": "<@some-twitter-account>" } }
11. Press "Test" Button.
