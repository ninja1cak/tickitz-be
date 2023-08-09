<div align='center' style="text-align: center;">

<h1 style="border:0;margin:1rem">Zwallet Backend</h1>

Backend for Zwallet

[Suggestion](mailto:hauzan41200@gmail.com)

<hr>
<br>

</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Postman Collection](#postman-collection)
- [Resources](#resources)
- [Contributors](#contributors)
- [Related Project](#related-projects)
- [License](#license)
- [Suggestion](#suggestion)

## Overview

Zwallet is an application that focussing in banking needs for all users in the world. Zwallet app supports banking activities such as transfers, top ups, histories, etc. Zwallet app also supports user controls such as login, register, and update profiles.

## Features

- Authentication
- Transaction (search, sort, filter, create)
- User Role: Tranfer, Profile (Update)
- Error Handling
- Email Activation
- etc.

## Technologies Used

- [Node js](https://nodejs.org/en/docs)
- [Express js](https://expressjs.com/)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Postgresql](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/)
- [Nodemailer](https://nodemailer.com/about/)
- etc.

## Getting Started

### Installation

1. Clone this repo

   ```bash
   git clone https://github.com/ninja1cak/zwallet-be
   ```

2. Enter the directory

   ```bash
   cd zwallet-be
   ```

3. Install all dependencies

   ```bash
   npm install
   ```

4. Create .env file

   ```env
    DB_HOST = [YOUR DATABASE HOST]
    DB_USER = [YOUR DATABASE USER]
    DB_PASSWORD = [YOUR DATABASE PASSWORD]
    DB_DATABASE = [YOUR DATABASE NAME]
    KEY = [YOUR KEY]
    PORT = [YOUR PORT]
    CLOUDINARY_URL = [YOUR CLOUDINARY API]
    NODEMAILER_EMAIL = [YOUR EMAIL]
    NODEMAILER_PASSWORD = [YOUR EMAIL PASSWORD]

   ```

5. Start the local server

   ```bash
   node index.js
   ```

   or (if you want auto start if any change in code)

   ```bash
   npm run dev
   ```

## Postman Collection

You can download in <a href='https://drive.google.com/file/d/1iGTRVvIm_XJAoyn6ciRrdqwhckKD1cm3/view?usp=sharing'> Here </a>


## Resources

Special thanks to:

- [Vercel](https://vercel.com) - deploying code

## Contributors

Currently, there are no contributors to this project. If you would like to contribute, you can submit a pull request.

## Related Projects

- [Zwallet Front End](https://github.com/ninja1cak/zwallet-fe) - Front End

## License

This project is licensed under the ISC License

## Suggestion

If you find bugs / find better ways / suggestions you can pull request.