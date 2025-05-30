# 🧑‍💼 User Management Dashboard

A simple admin dashboard built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Features

- **User Listing**: Fetches and displays users from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).
- **Search Functionality**: Filter users by name or city.
- **Multi-Step User Form**:
  - **Step 1**: Basic Info (name, email).
  - **Step 2**: Address (street, city, zip).
  - **Step 3**: Review & Confirm.
- **Form Validation**: Ensures required fields are filled and email is valid.
- **State Management**: Utilizes React Context and `useState` for managing form data and steps.
- **Local Storage**: Optional hook to persist form data.
- **Reusable Components**: Includes components like `Loader`, `UserCard`, and `SearchBar`.

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ with App Router.
- **Language**: TypeScript.
- **Styling**: Tailwind CSS.
- **HTTP Client**: Fetch API.
- **State Management**: React Context API.

## 📁 Project Structure
user-dashboard/
├── components/
│   ├── add-user/
│   │   ├── Step1BasicInfo.tsx
│   │   ├── Step2Address.tsx
│   │   └── Step3Review.tsx
│   ├── AddUserForm.tsx
│   ├── Loader.tsx
│   ├── UserCard.tsx
│   └── SearchBar.tsx
├── context/
│   └── AddUserContext.tsx
├── hooks/
│   └── useLocalStorage.ts
├── pages/
│   ├── dashboard/
│   │   └── index.tsx
│   ├── add.tsx
│   └── _app.tsx
├── types/
│   └── user.ts
├── utils/
│   └── api.ts
├── public/
├── styles/
│   └── globals.css
├── tailwind.config.js
├── tsconfig.json
└── package.json