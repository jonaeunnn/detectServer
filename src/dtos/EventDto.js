// Event 관련 DTO 작성
export const bodyToEvent = (body) => {
  const event = {
    event_type: body.event_type,
    confidence: body.confidence,
    user_id: body.user_id,
  };

  if (body.event_type === "violence") {
    event.scream_level = body.scream_level || 0; // 기본값 0 처리
  }

  return event;
};

// 응답 데이터 형식화 (예: 클라이언트로 보내는 이벤트 정보)
export const responseFromEvent = (event) => {
  return {
    event_type: event.event_type,
    detected_at: event.detected_at.toISOString(), // Date 객체를 ISO 형식으로 반환
    confidence: event.confidence,

    scream_level: event.scream_level || null, // scream_level이 있을 경우만 반환
  };
};

export const responseGetEvent = (events) => {
  // 여러 이벤트 로그가 배열로 들어옴
  return events.map((event) => ({
    event_type: event.event_type, // event_type을 추출
    detected_at: event.detected_at, // detected_at을 추출
    confidence: event.confidence, // confidence 값을 추출
  }));
};
