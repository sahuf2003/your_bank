# YourBank

## Overview
A banking system built with **React.js**, **Node.js/Express**, and **MySQL**. The frontend is deployed on **Vercel**, and the backend is deployed on **Render.com**. Customers can register, log in, and manage transactions. Bankers can log in to view customer transaction history.

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL (FreeSQLDatabase.com)
- **Deployment**:
-  Vercel (frontend) ,
-  Render.com (backend) 

---


## 🔧 Frontend Routes and Behavior
- **`/` (Landing Page)**: The homepage of the app.
  
- **`/login` (Customer Login)**: 
  - Customers log in using their email and password.
  - On successful login, an **access token** is stored in `localStorage` and is sent in the headers for every transaction.

- **`/register` (Customer Registration)**: 
  - Customers can register with their name, email, and password.
  - After successful registration, customers can log in through `/login`.

- **`/transaction` (Transaction History)**: 
  - Customers can view their transaction history.
  - Allows them to deposit or withdraw funds.
  - Requires an **access token** in headers for authentication.
  - Withdrawal is restricted if the balance is insufficient.

- **`/banklogin` (Banker Login)**: 
  - Bankers log in using their credentials.
  - After successful login, they can access `/accounts` to view customer transaction histories.

- **`/accounts` (Banker View Accounts)**: 
  - After a banker logs in, they can view a list of customer accounts and click to view individual customer transactions.




