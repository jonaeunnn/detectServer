import { StatusCodes } from "http-status-codes";
import { LoginServices } from "../services/LgoinService.js";
import { bodyToLogin } from "../dtos/LoginDto.js";

export const handleLogin = async (req, res, next) => {
  try {
    console.log("로그인 요청을 하였습니다.");
    console.log("body:", req.body); // 입력 값 확인용

    // DTO로 변환하여 LoginServices 호출
    const loginResult = await LoginServices(bodyToLogin(req.body));

    // 로그인 서비스에서 반환된 결과로 응답 처리
    if (loginResult.status === 200) {
      // 성공
      res.status(StatusCodes.OK).json({ result: loginResult });
    } else if (loginResult.status === 401) {
      // 인증 실패
      res.status(StatusCodes.UNAUTHORIZED).json({ error: loginResult.message });
    } else {
      // 예상치 못한 응답 처리
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  } catch (error) {
    console.error("Error during login handling:", error);
    // 서버 오류 처리
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
  }
};
