# Smart Personal Expense Manager (AI-Powered)

A full-stack financial tracking application that allows users to manage daily expenses and uses Machine Learning to predict future spending trends based on historical data.

> 📌 Note: Place your dashboard screenshot inside a folder named `screenshots/` in the project root.

---

## 🚀 Key Features

- ✅ Full Stack CRUD – Add, View, Delete, and Update daily expenses seamlessly
- 📊 Interactive Dashboard – Dynamic Pie & Line charts using Chart.js
- 🤖 AI Prediction Engine – Linear Regression model forecasts future expenses
- 🔐 Secure Authentication – JWT-based authentication with Spring Security
- 🏗 Microservices Architecture – Spring Boot (Business Logic) + Flask (AI Logic)

---

## 🛠️ Tech Stack

**Frontend**
- Angular 17
- Bootstrap 5
- Chart.js

**Backend**
- Java Spring Boot 3
- Spring Data JPA
- Hibernate
- Spring Security (JWT)

**Database**
- MySQL

**AI / ML**
- Python
- Flask
- Scikit-learn
- Pandas

---

## ⚙️ Architecture & Workflow

1. Angular sends user input to the Spring Boot backend.
2. Spring Boot stores transactions in MySQL.
3. When "Predict" is clicked, Spring Boot calls the Python Flask API.
4. Flask processes data using Linear Regression.
5. The predicted expense is returned to Spring Boot.
6. Angular displays the prediction on the dashboard.

---

## 🔧 Installation & Setup

### 1️⃣ Database Setup

Create a MySQL database:

```sql
CREATE DATABASE expense_tracker;

```

### 2️⃣ Backend (Spring Boot)

Navigate to the backend directory and run the Spring Boot application:

```bash
cd expense-tracker-backend
mvn spring-boot:run

```

### 3️⃣ AI Service (Python)

Navigate to the AI directory, install dependencies, and start the Flask server:

```bash
cd expense-predictor-ai
pip install flask pandas scikit-learn flask-cors
python app.py

```

### 4️⃣ Frontend (Angular)

Navigate to the frontend directory, install the required packages, and start the development server:

```bash
cd expense-tracker-frontend
npm install
ng serve

```

Open your browser and navigate to: **`http://localhost:4200`**

```
