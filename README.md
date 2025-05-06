# Authenticate-and-Authorize

A robust authentication and authorization setup built with Node.js, Express.js, and TypeScript, designed for secure multi-device session management and dynamic database connections.

## 🚀 Features

- ✅ **Login & Signup** functionality with hashed passwords
- 🔐 **JWT-based Authentication** stored in Redis for 24 hours
- 🧠 **Authorization Middleware** to check user roles and permissions
- 🔁 **Multi-Device Session Tracking** with IP and platform details
- 🔓 **Logout from All Devices** using current session
- 🔄 **Dynamic Database Switching** using `client-token`
- 🔒 **Credentials Management** via AWS SSM Parameter Store

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (via AWS RDS), Redis
- **Cloud Services:** AWS EC2, AWS SSM, AWS RDS
- **Token Management:** JWT
- **Credential Handling:** `@aws-sdk/client-ssm`

## 🧩 Architecture Highlights

- Passwords are hashed during registration using a secure hashing algorithm.
- Credentials and secrets are stored and fetched from AWS SSM for enhanced security.
- Redis is used to cache JWTs for quick user authorization without repeated DB lookups.
- Middleware checks handle:
  - Authentication via JWT
  - Authorization by user role
  - Database switching logic using `client-token`
- User session includes IP and platform, allowing selective session logout.

## 📦 Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/SnigdhaP2000/Authenticate-and-Authorize.git
   cd Authenticate-and-Authorize
   ```
