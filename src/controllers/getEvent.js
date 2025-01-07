import { StatusCodes } from "http-status-codes";
import { bodyToEvent } from "../dtos/EventDto.js";
import { event_get_services } from "../services/EventGetServices.js";

export const getEvent = async (req, res, next) => {
  console.log("이벤트 조회를 요청하였습니다.");
  console.log("user_id:", req.params.user_id); // user_id를 경로에서 추출하여 확인

  const user = await event_get_services({ user_id: req.params.user_id });
  res.status(StatusCodes.OK).json({ result: user });
};
