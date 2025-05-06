# Authenticate-and-Authorize

A secure and scalable authentication and authorization system built with Node.js, Express.js, and TypeScript, backed by PostgreSQL and Redis, and integrated with AWS services.

## 🚀 Features

- ✅ **Login & Signup** with hashed password storage
- 🔐 **JWT-based Authentication**, stored in Redis with 24-hour expiration
- 🧠 **Role-based Authorization** with middleware checks
- 🧭 **Session Tracking** with user IP and platform info
- 🔓 **Logout from Other Devices** using current session
- 🔄 **Dynamic PostgreSQL DB Switching** via `client-token`
- 🔒 **Secure Credential Storage** using AWS SSM Parameter Store

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** PostgreSQL (via AWS RDS)  
- **Session Store & Caching:** Redis  
- **Cloud Services:** AWS EC2, AWS RDS, AWS SSM  
- **Token Management:** JWT  
- **Credential Management:** `@aws-sdk/client-ssm`

## 🧩 Architecture Highlights

- User passwords are securely hashed on registration.
- AWS SSM is used to store and fetch DB credentials dynamically.
- PostgreSQL is used for user/session data; Redis is used for caching JWT tokens.
- Middleware pipeline handles:
  - Authentication using JWT
  - Authorization based on roles/permissions
  - DB connection switching via `client-token`
- Session info includes device IP and platform, allowing logout from other sessions.

## 📦 Setup Instructions

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/Authenticate-and-Authorize.git
   cd Authenticate-and-Authorize
