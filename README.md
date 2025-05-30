# 📝 PayoneerAssignment – React Native Todo App

A modular, offline-first React Native ToDo application built using TypeScript, Redux Toolkit, and modern mobile architecture practices. It demonstrates local persistence, animated UI, and conditional syncing with a remote API.

---

You can start by looking into the package.json — it outlines the scripts and dependencies that help structure the app’s flow. It’s a good entry point to understand the setup.

## 🚀 Features

- ✅ Add, edit, delete, and mark tasks as complete
- 📡 Sync tasks from API only when connected to internet
- 📴 Works offline with data persistence using MMKV
- 📦 Modular folder architecture for scalability
- ✨ Reanimated animations on task interaction
- 🔍 Shows sync status & offline indicators
- 🧠 Clean, typed Redux state management

---

## 📁 Project Structure

/src
├── components # Reusable UI components (e.g., FAB, SyncIndicator, TodoItem)
├── screens # Main screen (TasksScreen) and modal (CreateTaskModal)
├── store # Redux store, slices, and RTK Query setup
├── hooks # Custom hooks (e.g., useNetworkStatus)
├── constants # App-wide color palette and string constants
└── types # Shared TypeScript types (Task, TodoItemProps, etc.)

---

## 🛠️ Tech Stack

- **React Native**
- **Redux Toolkit** (slices + RTK Query)
- **TypeScript**
- **Reanimated v2**
- **React Native Modal**
- **React Native Config**
- **React Native MMKV**

💾 Why MMKV over AsyncStorage?
🔥 Much faster (C++ powered)

🚀 Reduces cold start time

📉 No async/await needed for reads

🧠 Ideal for offline-first & high-perf apps

---

## 🧠 Key Concepts

| Feature             | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| Local State + Redux | Tasks are stored in Redux with offline fallback                      |
| RTK Query           | Fetch tasks from API using a declarative, cache-aware approach       |
| Network Aware Sync  | Sync from API only once per session when connected                   |
| Animation           | Entry/exit transitions using `FadeInRight` and `FadeOutLeft`         |
| Edit Support        | Update modal pre-fills task data for editing                         |
| Type Safety         | Fully typed with `Task`, `TodoItemProps`, and slice state interfaces |

## 📂 Environment Setup

`.env`

env
`BASE_URL=https://jsonplaceholder.typicode.com`

---

## 🧪 Getting Started

1. Install dependencies:

```bash
yarn install
```

# 👨‍💻 Author

## Sourabh Bhatt
