import { Router } from "express";
import { chatController } from "../controllers/chatController";

// Роутер слоя для API-эндпоинтов
const router = Router();

// Отдаем историю сообщений
router.get("/api/messages", chatController.getMessages);

export default router;
