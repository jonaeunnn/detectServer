import { StatusCodes } from "http-status-codes";
import { bodyToEvent } from "../dtos/EventDto.js";
import { eventservices } from "../services/EventServices.js";

export const handleEvent = async (req, res, next) => {
  console.log("이벤트가 발생하였습니다.");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await eventservices(bodyToEvent(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};
