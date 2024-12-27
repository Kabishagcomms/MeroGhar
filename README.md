FYP_MeroGhar
MERN Stack Application
This is a basic MERN (MongoDB, Express.js, Next.js, Node.js) stack application.

Installation
To install and run this application locally, please follow the instructions below:

Prerequisites
Make sure you have the following software installed on your machine:

Node.js (version 14 or above)
MongoDB


Step 1: Clone the repository
Clone this repository to your local machine using Git:


git clone <repository-url>
  
  
Step 2: Install dependencies
Navigate to the server directory and install the server-side dependencies:


cd server
npm install
Next, go to the client directory and install the client-side dependencies:


cd meroghar
npm install
  
  
Step 3: Configure the environment variables
Create a .env file in the project root directory and provide the following variables:

dotenv
Copy code
sessionSecret=
saltRounds=
accessToken=
refreshToken=
accessTokenExpire=
refreshTokenExpire=
dbPassword=
googleClientId=
googleClientSecret=
facebookClientId=
facebookClientSecret=
user=
pass=
mailSecret=
Replace <your-mongodb-connection-string> with the connection string for your MongoDB database.

Step 4: Start the application
Start the server by running the following command in the project root directory:


npm start
This will start the server at http://localhost:2900.

In a separate terminal, navigate to the client directory and start the Next.js development server:


cd meroghar
npm run dev # for development
npm run build # for production
npm run start # for production
This will start the client application at http://localhost:3000.

You can now access the application in your web browser.

Contributing
Contributions are welcome! If you find any issues or want to add new features, please create a pull request.

License
This project is licensed under the Nikan Khadka
