# Invoice Generate

## Introduction
<!-- A brief overview of what the project does, its purpose, and its main features. -->
This is a full-stack web application built with Node.js, Express.js, and MongoDB. It allows users to generate and download invoices in both PDF formats. The application leverages Puppeteer for generating the invoices and utilizes JWT for user authentication.


## Features
- **User Authentication**: Secure login and registration system for users.
- **Invoice Creation**: Users can add products to an invoice, which calculates totals with GST (18%).
- **Download Invoices**: Invoices can be downloaded in PDF format.
- **View Past Invoices**: Users can view and download past invoices.

## Getting Started

### Prerequisites

1. To run the application you need to have Node JS installed.
2. MongoDB Atlas Account
3. GIT Bash
4. Docker Desktop (windows)

### Quick Start
A simple example to get started with the project.
1. Cloning repository from GITHUB
2. Install all node-modules
```
npm i
``` 
3. Create a .ENV (Inside ENV)
````` 
PORT = 5000
DB_URI = "Provide mongoDB(Atlas) URI"
JWT_SECRET = "Random String(your Email)"
`````
4. Open docker desktop and start docker engine
```
docker-compose up
```
5. npm start

### Code Structure

Using the MVC Structure for the Code practices.

## API Documentation
API Documentation- There are three types of APi's. these are Users api's and product api's and last one is view all quotation.

Step to use Api:- In the APi's we are using the Authentication using JWT, So first you can register yourself using /register API and the login using /login API and take the Token from it and pass in an authorization after that you can perform the others api to access the users data.  

# NOTE :- Please do refer to Postman collection for particular API's Payloads.

## API ENDPOINTS
## USER
1. POST /api/v1/auth/register: Create a new user.
2. POST /api/v1/auth/login : Login a user.

## Product
1. POST /api/v1/product/add-product: Create a new product and generate PDF

## View-Quotation
1. GET /api/v1/quotation/quotations: View all quotations.

## POSTMAN COLLECTION

```
https://documenter.getpostman.com/view/21334201/2sAXqnfQhg
```