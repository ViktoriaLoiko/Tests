(() => {
  // Находим нужные элементы DOM заранее
  const messagesEl = document.getElementById("messages");
  const authorEl = document.getElementById("author");
  const messageEl = document.getElementById("message");
  const sendBtn = document.getElementById("send");
  const feedbackEl = document.getElementById("feedback");
  const statusPill = document.getElementById("status-pill");
  const usersCountEl = document.getElementById("users-count");
  const EMOJIS = ["😀", "😂", "😍", "👍", "🔥", "🎮", "🐌"];


  // Создаем подключение к серверу Socket.io
  const socket = io();

  // Загружаем ранее выбранное имя из localStorage, если оно было
  const savedName = localStorage.getItem("mkchat:name");
  if (savedName && authorEl instanceof HTMLInputElement) {
    authorEl.value = savedName;
  }

  // Утилита для смены статуса сервера
  const setStatus = (text, online) => {
    statusPill.textContent = text;
    statusPill.classList.toggle("status-pill--online", online);
    statusPill.classList.toggle("status-pill--offline", !online);
  };

  // Форматирование времени
  const formatTime = (timestamp) => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(timestamp));
    } catch {
      return "";
    }
  };

  // Создание DOM-элемента сообщения для вставки в список
  const createMessageElement = (message) => {
    const container = document.createElement("article");
    container.className = "message";

    const meta = document.createElement("div");
    meta.className = "message__meta";

    const author = document.createElement("span");
    author.className = "message__author";
    author.textContent = message.author;

    const time = document.createElement("time");
    time.className = "message__time";
    time.textContent = formatTime(message.timestamp);

    meta.append(author, time);

    const text = document.createElement("p");
    text.className = "message__text";
    text.textContent = message.text;

    container.append(meta, text);
    return container;
  };

  // Рендер всей истории
  const renderMessages = (messages) => {
    messagesEl.innerHTML = "";
    messages.forEach((m) => {
      messagesEl.appendChild(createMessageElement(m));
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  // Добавление одного сообщения в конец
  const appendMessage = (message) => {
    messagesEl.appendChild(createMessageElement(message));
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  // Показ уведомления (показ подсказки об ошибке/успехе)
  const showFeedback = (text, isError = false) => {
    feedbackEl.textContent = text;
    feedbackEl.classList.toggle("feedback--error", isError);

    // // Убираем через 3 секунды
    // setTimeout(() => {
    //   feedbackEl.textContent = "";
    //   feedbackEl.classList.remove("feedback--error");
    // }, 3000);
  };

  //Получаем историю через REST, чтобы сразу показать уже отправленные сообщения
  const loadHistory = async () => {
    try {
        const response = await fetch("/api/messages");
        if (!response.ok) {
            throw new Error("Failed to load history");
        }

        const data = await response.json();
        renderMessages(data.messages || []);
        showFeedback("Loaded history");
    } catch (error) {
        console.error(error);
        showFeedback("Could not load history", true);
    }
  };

  // Отправка сообщения на сервер
  const sendMessage = () => {
    const author = authorEl.value.trim() || "Anonymous";
    const text = messageEl.value.trim();

    if (!text) { // if (!author || !text) {
      showFeedback("Type something before sending", true); //showFeedback("Заполните имя и сообщение", true);
      return;
    }

    // сохраняем имя, чтобы не вводить его каждый раз
    localStorage.setItem("mkchat:name", author);

    sendBtn.disabled = true;
    showFeedback("Sending...");

    socket.emit("chat:send", { author, text }, (err) => {
      sendBtn.disabled = false;
      if (err) {
        showFeedback(err, true);
        return;
      }

      messageEl.value = "";
      messageEl.focus();
      showFeedback("Sent!");
    });
  };

  // Инициализация: загрузка истории и подключение событий UI
  const init = () => {
    loadHistory();

    // Смайлики рендер
  const emojiBar = document.getElementById("emoji-bar");

  if (emojiBar && messageEl) {
    EMOJIS.forEach((emoji) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = emoji;
      btn.className = "emoji-btn";

      btn.addEventListener("click", () => {
        messageEl.value += emoji;
        messageEl.focus();
      });

      emojiBar.appendChild(btn);
    });
  }

    sendBtn.addEventListener("click", sendMessage);

    messageEl.addEventListener("keydown", (event) => {
        // Отправляем по Ctrl/Cmd + Enter, чтобы было похоже на мессенджеры
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
  };

  // Подписки на сокет-события
  socket.on("connect", () => setStatus("Online", true));
  socket.on("disconnect", () => setStatus("Offline", false));

  // socket.on("connect", () => {
  //   setStatus("Online", true);
  //   showFeedback("Соединение установлено");
  // });

  // socket.on("disconnect", () => {
  //   setStatus("Offline", false);
  //   showFeedback("Соединение потеряно", true);
  // });

  socket.on("users:count", (count) => {
    if (usersCountEl) {
      usersCountEl.textContent = count;
    }
  });


  // Сервер присылает всю историю при подключении
  socket.on("chat:init", (messages) => renderMessages(messages));

  // Новое сообщение от любого пользователя
  socket.on("chat:new", (message) => appendMessage(message));

  // Если сервер вернул ошибку не через callback
  socket.on("chat:error", (msg) => showFeedback(msg, true));

  // Запускаем инициализацию, когда DOM готов (скрипт подключен в конце, на всякий случай)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
