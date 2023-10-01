# Ayo Coding

A dummy online course website like Udemy, etc.
note: this website is for developmnent only!

## Table of Contents
- [Ayo Coding](#ayo-coding)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Tips](#tips)

## Features

- Register
- Login
- Logout
- Add new course
- Edit course
- Delete course
- Buy course
- Edit profile

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/HuseinHQ/ayo-coding.git
    ```

2. Navigate to the project directory:

    ```bash
    cd ayo-coding
    ```

3. Install dependencies:

    ```bash
    npm install  # or yarn install
    ```

## Usage

To use this project, follow these steps:

1. Run the following command to apply database migrations:

    ```bash
    npx sequelize db:migrate
    ```

2. Seed the database with initial data using:

    ```bash
    npx sequelize db:seed:all
    ```

3. Start the application:

    ```bash
    npm start
    ```

Now, your project should be up and running. Access it through your browser or other specified methods, and you're good to go!

## Tips

- The default role of a registered account is "user."

- If you want to log in with an "admin" role, you can use the following credentials:
  - **Username:** admin_user
  - **Password:** adminpassword
