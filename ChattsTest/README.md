# 💬 Brain Slug Chat

**Brain Slug Chat** is a simple real-time chat application built with  
**Node.js**, **Express**, **Socket.io**, and **TypeScript**.

**Brain Slug Chat** — простое приложение чата в реальном времени, созданное с использованием  
**Node.js**, **Express**, **Socket.io** и **TypeScript**.

---

## 🌍 Languages / Языки
- 🇬🇧 English version below  
- 🇷🇺 Русская версия ниже  

---

# 🇬🇧 English Version

## 📖 About the Project
Brain Slug Chat is a real-time web chat application that allows users to communicate instantly in the browser.

The project demonstrates:
- real-time communication using Socket.io  
- clean project structure (MVC + service layer)  
- client–server interaction via REST and WebSockets  
- basic security practices (no secrets stored in the repository)

---

## ✨ Features
- 💬 Real-time messaging  
- 🕘 Message history  
- 👥 Online users counter  
- 😊 Emoji support  
- 🟢 Server status indicator (online / offline)  
- ⌨️ Keyboard shortcut: **Ctrl / Cmd + Enter**

---

## 🛠 Technologies & Libraries
- **Node.js**
- **Express**
- **Socket.io**
- **TypeScript**
- **cors**
- **nodemon**
- **ngrok** (optional, for external access)

---

## 📁 Project Structure

```
src/
├─ controllers/    # HTTP controllers
├─ models/         # Data models
├─ routes/         # REST API routes
├─ services/       # Socket.io service
└─ server.ts       # Application entry point

public/
├─ index.html      # Client UI
├─ client.js       # Client logic
└─ styles.css      # Styles

````

---

## ⚙️ Installation
```bash
npm install
````

---

## ▶️ Running the Project

### Development mode

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production mode

```bash
npm start
```

---

## 🌐 Run with ngrok (optional)

Ngrok can be used to expose the local server to the internet.

```bash
npx ngrok config add-authtoken YOUR_TOKEN
npm run tunnel
```

> ⚠️ The ngrok token is stored locally and is **not included** in the repository.

---

## 🚀 Future Improvements

* User authentication and usernames registration
* Message editing and deletion
* Improved UI

---

## 📌 Requirements

* Node.js v18+
* npm

---

# 🇷🇺 Русская версия

## 📖 О проекте

Brain Slug Chat — это веб-приложение чата в реальном времени, которое позволяет пользователям мгновенно общаться в браузере.

Проект демонстрирует:

* работу с Socket.io в реальном времени
* чистую архитектуру (MVC + service layer)
* взаимодействие клиента и сервера через REST и WebSocket
* базовые практики безопасности (секреты не хранятся в репозитории)

---

## ✨ Возможности

* 💬 Чат в реальном времени
* 🕘 История сообщений
* 👥 Счётчик пользователей онлайн
* 😊 Поддержка смайликов
* 🟢 Индикатор состояния сервера
* ⌨️ Горячие клавиши: **Ctrl / Cmd + Enter**

---

## 🛠 Используемые технологии и библиотеки

* **Node.js**
* **Express**
* **Socket.io**
* **TypeScript**
* **cors**
* **nodemon**
* **ngrok** (по желанию)

---

## 📁 Структура проекта

```
src/
 ├─ controllers/    // Контроллеры HTTP
 ├─ models/         // Модели данных
 ├─ routes/         // REST-маршруты
 ├─ services/       // Сервис Socket.io
 └─ server.ts       // Точка входа приложения

public/
 ├─ index.html      // Клиентский интерфейс
 ├─ client.js       // Логика клиента
 └─ styles.css      // Стили
```

---

## ⚙️ Установка

```bash
npm install
```

---

## ▶️ Запуск проекта

### Режим разработки

```bash
npm run dev
```

### Сборка проекта

```bash
npm run build
```

### Запуск собранного проекта

```bash
npm start
```

---

## 🌐 Запуск через ngrok (по желанию)

```bash
npx ngrok config add-authtoken ВАШ_ТОКЕН
npm run tunnel
```

> ⚠️ Токен ngrok хранится локально и **не публикуется** в репозитории.

---

## 🚀 Будущие возможные улучшения

* Авторизация пользователей
* Редактирование и удаление сообщений
* Улучшение интерфейса

---

## 📌 Требования

* Node.js v18+
* npm

---

## 📄 License

```
MIT
```
