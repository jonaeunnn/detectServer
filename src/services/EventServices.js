// EventServices.js
import { responseFromEvent } from "../dtos/EventDto.js";
import {
  addEventLog,
  addViolenceEvent,
} from "../repositories/Eventrepositories.js";

// 이벤트 서비스 로직
export const eventservices = async (data) => {
  try {
    // 1. "event_log" 테이블에 이벤트 기록
    const event = await addEventLog({
      event_type: data.event_type,
      confidence: data.confidence,
      user_id: data.user_id,
    });

    // 2. "violence_event" 테이블에 scream_level 기록 (violence event인 경우에만)
    if (data.event_type === "violence" && data.scream_level !== undefined) {
      await addViolenceEvent({
        event_id: event.id, // event_log 테이블에서 생성된 event_id
        scream_level: data.scream_level,
      });
    }

    // 3. 사용자에게 반환할 이벤트 정보 준비
    const eventResponse = {
      event_type: event.event_type,
      detected_at: event.detected_at,
      confidence: event.confidence,
      details: event.details,
    };

    if (data.event_type === "violence") {
      eventResponse.scream_level = data.scream_level;
    }

    // 4. 반환 값 형식화
    return responseFromEvent(eventResponse);
  } catch (error) {
    console.error("Error handling event:", error);
    throw new Error("이벤트 처리 중 오류가 발생했습니다.");
  }
};
