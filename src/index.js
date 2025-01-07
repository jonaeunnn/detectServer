import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleEvent } from "./controllers/EventController.js";
import { handleLogin } from "./controllers/handleLogin.js";
import { getEvent } from "./controllers/getEvent.js";
import { createServer } from "http"; // WebSocket과 통합을 위한 HTTP 서버
import { WebSocketServer } from "ws"; // WebSocket 모듈
dotenv.config();

const app = express();
const port = 3002;
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// WebSocket 연결 처리
wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.send(JSON.stringify({ message: "WebSocket connection established!" }));

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

// /api/event 라우트에서 이벤트 처리 및 WebSocket 알림 전송
app.post("/api/event", async (req, res) => {
  try {
    console.log("이벤트가 발생하였습니다.");
    console.log("body:", req.body);

    // 기존 handleEvent 호출 (DB 저장 로직 수행)
    await handleEvent(req, res);

    // WebSocket을 통해 연결된 모든 클라이언트에 이벤트 데이터 전송
    const { event_type, confidence, user_id } = req.body;
    const detectedAt = new Date().toISOString();
    const eventData = {
      event_type,
      confidence,
      user_id,
      detected_at: detectedAt,
      message: "이상행동 감지!",
    };

    console.log("WebSocket 전송 데이터:", eventData);

    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(eventData));
      }
    });
  } catch (error) {
    console.error("이벤트 처리 중 오류:", error);
    res.status(500).json({ error: "Event processing failed" });
  }
});

// 기타 라우트
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/event/:user_id", getEvent);
app.post("/api/login", handleLogin);

// 서버 실행
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
