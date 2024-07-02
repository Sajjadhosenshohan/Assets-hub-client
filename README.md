# Assets-hub - Asset Management System

## Live Link: [https://my-assets-c2027.web.app](https://my-assets-c2027.web.app)

## Server side repository: [https://github.com/Sajjadhosenshohan/Assets-hub-server](https://github.com/Sajjadhosenshohan/Assets-hub-server)





## Project Overview

XYZ is developing a web application aimed at facilitating asset and product management for businesses subscribing to the service. The primary focus is to assist HR Managers in monitoring the usage of company assets, categorized into Returnable (e.g., laptops, chairs) and Non-returnable (e.g., pens, paper).


## Technologies

- Frontend: React, React Router Dom, TailwindCSS, Daisy ui, Vite

- Backend: Node.js, Express, MongoDB, stripe, jsonwebtoken
- Authentication: Firebase

## Features

- Secure Payment Processing with Stripe: Implement Stripe to securely handle subscription payments, offering HR managers seamless options to upgrade their employee limits

- Jwt: Secure login and registration using email/password and Google authentication using Jwt.

- CRUD Operations: Assignment creator can update, delete his/her assignment but Assignment Examiner can  read, give mark using patch operation Job Assignment.



## Run Locally

### Client Side (Frontend)

Clone the repository:

```bash
git clone https://github.com/Sajjadhosenshohan/Assets-hub-client

```

Go to the project directory:

```bash
  cd Assets-hub-client
```

Install dependencies:

```bash
  npm install
```

Start the server:

```bash
  npm run start
```
### Environment Variables(Client side)

`MONGODB_URI`= your_mongodb_uri
`FIREBASE_API_KEY`=your_firebase_api_key
`FIREBASE_AUTH_DOMAIN`=your_firebase_auth_domain
`FIREBASE_PROJECT_ID`=your_firebase_project_id
`FIREBASE_STORAGE_BUCKET`=your_firebase_storage_bucket
`FIREBASE_MESSAGING_SENDER_ID`=your_firebase_messaging_sender_id
`FIREBASE_APP_ID`=your_firebase_app_id

`IMGBB_API_KEY`=your_imgbb-api-key
`PAYMENT_GATEWAY_PK`=your_payment-gateway-pk




### Server Side (Backend)

Clone the repository:

```bash
git clone https://github.com/Sajjadhosenshohan/Assets-hub-server

```

Go to the project directory:

```bash
  cd Assets-hub-server
```

Install dependencies:

```bash
  npm install
```

Start the server:

```bash
  nodemon index.js
```
### Environment Variables(Server side)

`BASE_URL` "http://localhost:7000"

`PORT`=7000

`MONGODB_URI` = "mongodb+srv://:@cluster0.jzvet.mongodb.net/?retryWrites=true&w=majority"

`DB_USER`=your_mongodb_user_name

`DB_PASS`= your_mongodb_password

`ACCESS_TOKEN_SECRET`= your_token_secret

`STRIPE_SECRET_KEY`= your_stripe-secret-key


## Authors

- [@Sajjadhosenshohan](https://github.com/Sajjadhosenshohan)


## Feedback

If you have any feedback, please reach out to us at mdshohansajjad@gmail.com

