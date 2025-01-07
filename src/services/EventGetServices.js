// EventGetServices.js

import { getEventLogsByUserId } from "../repositories/Eventrepositories.js";
import { responseGetEvent } from "../dtos/EventDto.js";
export const event_get_services = async ({ user_id }) => {
  try {
    // user_id에 해당하는 이벤트 로그를 가져옴
    const eventLogs = await getEventLogsByUserId(user_id);
    console.log(eventLogs);
    // 이벤트 로그를 DTO 형식으로 변환해서 반환
    return responseGetEvent(eventLogs);
  } catch (err) {
    throw new Error(`Failed to get events: ${err}`);
  }
};
