# 🌸 PCOS/PCOD Care App

An AI-powered, user-centric web application designed to **support women with PCOS (Polycystic Ovary Syndrome) or PCOD(Polycystic Ovarian Disease)** and those **at risk of developing PCOS/PCOD**. The app provides personalized health insights, medical report analysis, lifestyle guidance, mental health support, and a safe community space.

---

## 🚀 Problem Statement

PCOS/PCOD is a common hormonal disorder affecting millions of women, yet:

* Early detection is often missed
* Medical reports are hard to understand
* Lifestyle guidance is generic
* Mental health support is limited

**PCOS/PCOD Care App** bridges this gap by combining **AI + healthcare + community** in one platform.

---

## 🎯 Solution Overview

PCOS/PCOD Care App offers:

* Early **PCOS/PCOD risk assessment**
* **Medical report analyzer** using AI
* Personalized **diet & exercise plans**
* **Mental health support** tools
* A safe **community forum**
* Verified **educational resources**

The app adapts content based on whether the user:

* ✅ Has PCOS/PCOD
* ⚠️ Is at risk of PCOS/PCOD

---

## 🧩 Key Features

### 🔐 Authentication

* Secure login & signup using Firebase Authentication
* Email and Google Sign-in

### 🩺 Track Selection

* User selects:

  * "I have PCOS/PCOD"
  * "I am at risk of PCOS/PCOD"
* Data is stored and used for personalization

### 📄 Medical Report Analyzer

* Upload blood reports (PDF/Image)
* OCR using Google Vision API
* Rule-based AI analysis
* Simple explanations of medical terms

### 📊 PCOS/PCOD Risk Assessment

* Symptom-based scoring system
* Displays risk level: Low / Medium / High

### 🥗 Diet & Exercise Recommendations

* Personalized plans based on user profile
* PCOS/PCOD-friendly diet suggestions
* Beginner-friendly workouts

### 🧠 Mental Health Support

* Mood tracking
* Stress management tips
* Breathing & mindfulness exercises

### 💬 Community Forum

* Anonymous posting
* Ask questions & share experiences
* Supportive and moderated environment

### 📚 Educational Hub

* PCOS vs PCOD
* Myths vs Facts
* When to consult a doctor

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* v0.dev (UI generation)

### Backend & Services

* Firebase Authentication
* Firebase Firestore
* Firebase Storage

### AI & APIs

* Google Vision API (OCR)
* Rule-based AI logic

### DevOps & Deployment

* GitHub (Version Control)
* Vercel (Frontend Deployment)

---

## 📁 Project Structure

```
src/
 ├── components/      # Reusable UI components
 ├── pages/           # App pages (Login, Dashboard, etc.)
 ├── services/        # Firebase & API logic
 ├── utils/           # Helper functions
 ├── App.js
 └── index.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/pcos-care-app.git
cd pcos-care-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Firebase Setup

* Create a Firebase project
* Enable Authentication, Firestore, Storage
* Add Firebase config to `firebase.js`

### 4️⃣ Run the App

```bash
npm start
```

---

## 🌐 Deployment

* Frontend deployed using **Vercel**
* Backend powered by **Firebase**

---

## 🔒 Security & Privacy

* Secure authentication
* Firestore security rules
* User data stored safely

---

## 🏆 Future Enhancements

* ML-based PCOS prediction
* Wearable data integration
* Doctor consultation module
* Multi-language support

---

## 🤝 Contribution

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Open a Pull Request



---

## 💜 Acknowledgements

Built to empower women with knowledge, support, and better healthcare access.

---

**✨ Because PCOS care should be simple, supportive, and accessible.**

