User Management System

Overview :-

The User Management System is a React.js application that allows users to perform CRUD (Create, Read, Update, Delete) operations on user data. It integrates with an API (https://jsonplaceholder.typicode.com/users) to fetch and manage user details such as name, email, and department.

Features :-

Fetches user data from an external API

Displays users in a table format

Add new users

Edit existing users

Delete users

Displays success and error messages for actions

Uses Bootstrap for styling

Technologies Used

React.js: Component-based UI framework

Bootstrap: CSS framework for responsive design

Fetch API: To interact with external API

Installation

Clone the repository:

git clone https://github.com/omkarmm12/User-Management-Dashboard.git
cd User-Management-Dashboard

Install dependencies:

npm install

Start the application:

npm start

Project Structure

user-management/
│── src/
│   │── components/
│   │   ├── Header.js
│   │   ├── UserDetails.js
│   │   ├── UserManagement.js
│   │── index.js
│   │── App.js
│── public/
│── package.json
│── README.md

Usage

Open the app in your browser at http://localhost:3000.

Click on "Add New User" to create a user.

Click "Edit" next to a user to update their details.

Click "Delete" to remove a user.

API Endpoints

GET https://jsonplaceholder.typicode.com/users - Fetch users

POST https://jsonplaceholder.typicode.com/users - Add user

PUT https://jsonplaceholder.typicode.com/users/{id} - Update user

DELETE https://jsonplaceholder.typicode.com/users/{id} - Delete user

Contributing

If you would like to contribute, fork the repository and submit a pull request with improvements.

License

This project is open-source and available under the MIT License.

Contact

For any queries, please contact [degavathomkar934@example.com].

