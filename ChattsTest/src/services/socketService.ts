import { Server as SocketServer, Socket } from "socket.io";
import { ChatMessage, chatModel } from "../models/chatMessage";

// Soket.io
export class SocketService {
    constructor(private readonly io: SocketServer) {}

    //Подписываемся на события подключения и настраиваем слушатели
    public init(): void {
        this.io.on("connection", (socket: Socket) => {
            // Сообщаем в логи, кто подключился (по id сокета)
            console.log(`Игрок подключился: ${socket.id}`);

             // НОВОЕ: отправляем всем текущее количество пользователей онлайн
            this.emitUsersCount();

            // Отдаем пользовател. текущую историю сообщений
            socket.emit("chat:init", chatModel.getAll());

            // Навешиваем обработчик отправки сообщений
            this.handleSendMessage(socket);

            // При отключении просто логируем; дополнительной логики пока нет
            socket.on("disconnect", () => {
                console.log(`Игрок отключился: ${socket.id}`)

                // НОВОЕ: обновляем количество пользователей онлайн
                this.emitUsersCount();
            });
        });
    }

    // метод для новой фичи
    private emitUsersCount(): void {
        const count = this.io.sockets.sockets.size;
        this.io.emit("users:count", count);
    }

    // Отработка пользовательского события отправки нового сообщения
    private handleSendMessage(socket: Socket): void {
        socket.on(
            "chat:send",
            (payload: { author: string; text: string }, callback?: (err?: string) => void) => {
                try {
                    // Сохраняем сообщение через модель; она же валидирует текст
                    const message: ChatMessage = chatModel.add(payload.author, payload.text);

                    // Рассылаем всем подключенным клиентам
                    this.io.emit("chat:new", message);

                    // Подтверждаем отправителю успех (можно обновить UI)
                    if (callback) {
                        callback();
                    }
                } catch (error) {
                    const message = 
                        error instanceof Error ? error.message : "Не удалось отправить сообщение";

                    // Отдаем ошибку отправителю, чтобы показать подсказку на клиенте
                    if (callback) {
                        callback(message);
                    } else {
                        socket.emit("chat:error", message);
                    }
                }
            }
        );
    }
}
