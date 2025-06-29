# 💸 Financial Dashboard – Full Stack App

A modern financial dashboard that supports secure authentication, real-time data visualization (pie/bar charts), and transaction tracking. Built with **React + TypeScript** frontend and **Node.js + Express + MongoDB** backend.

---

## 📁 Folder Structure

```
financial-dashboard/
├── client/           # React frontend
├── server/           # Express backend (Node + MongoDB)
└── README.md
```

---

## ⚙️ Tech Stack

| Layer      | Tech                                 |
|------------|--------------------------------------|
| Frontend   | React + TypeScript + Recharts        |
| Backend    | Node.js + Express + JWT + Mongoose   |
| Database   | MongoDB (via Atlas or local)         |
| Styling    | Custom CSS or Tailwind (optional)    |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/financial-dashboard.git
cd financial-dashboard
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/finance-dashboard
JWT_SECRET=yourSuperSecretKey
```

Then seed your database:

```bash
npx ts-node src/scripts/seedUser.ts
npx ts-node src/scripts/seedTransactions.ts
```

### 3. Run the Backend

```bash
npx ts-node src/server.ts
```

---

### 4. Set Up the Frontend

In a new terminal:

```bash
cd client
npm install
npm run dev  # or npm start
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 👤 Default Login

```
Email:    admin@example.com
Password: password123
```

---

# 📘 API Documentation – Financial Dashboard

> RESTful API built with Express + MongoDB  
> All responses are in JSON. Authenticated routes require a JWT token.

---

## 🔗 Base URL

```
http://localhost:5000/api
```

---

## 🔐 Authentication

### ▶️ POST `/auth/login`

Authenticate user and return a JWT token.

#### 🔸 Request Headers

```
Content-Type: application/json
```

#### 🔸 Request Body

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

#### ✅ Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

#### ❌ Error Responses

| Code | Message                   |
|------|---------------------------|
| 401  | Invalid email or password |
| 500  | Internal server error     |

---

## 🔐 Protected Endpoints

Add this header to all secured routes:

```
Authorization: Bearer <your-jwt-token>
```

---

## 📊 Transactions

### ▶️ GET `/transactions`

Fetch all transactions (requires authentication).

#### 🔸 Headers

```
Authorization: Bearer <your-token>
```

#### ✅ Success Response

```json
[
  {
    "_id": "64f7a2c89a28f948c48e1bc2",
    "title": "Groceries",
    "category": "Food",
    "amount": 1200,
    "type": "expense",
    "date": "2024-06-01T00:00:00.000Z"
  },
  {
    "_id": "64f7a2c89a28f948c48e1bc3",
    "title": "Freelance",
    "category": "Income",
    "amount": 4500,
    "type": "income",
    "date": "2024-06-03T00:00:00.000Z"
  }
]
```

#### ❌ Error Responses

| Code | Message         |
|------|-----------------|
| 401  | Unauthorized    |
| 403  | Forbidden       |
| 500  | Server Error    |

---

### ▶️ (Optional) POST `/transactions`

Add a new transaction.

#### 🔸 Request Body

```json
{
  "title": "Consulting",
  "category": "Income",
  "amount": 7000,
  "type": "income",
  "date": "2024-06-10"
}
```

#### ✅ Success Response

```json
{
  "_id": "generated-id",
  "title": "Consulting",
  "category": "Income",
  "amount": 7000,
  "type": "income",
  "date": "2024-06-10T00:00:00.000Z"
}
```

---

## 🧪 Postman Test Flow

1. **POST** `/auth/login`  
   → Save the token

2. **GET** `/transactions`  
   → Add header:
   ```
   Authorization: Bearer <token>
   ```

---

## 📸 Screenshots (optional)

Add UI screenshots here if needed.

---

## 📬 License

MIT – Free to use and customize.