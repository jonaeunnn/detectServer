import { findUserByCredentials } from "../repositories/Loginrepositories.js";

// 로그인 서비스 로직
export const LoginServices = async (data) => {
  try {
    // 1. 로그인 검증 - username과 password로 사용자를 확인
    const user = await findUserByCredentials(data.username, data.password);
    console.log("User found: ", user);
    // 2. 사용자 인증 실패 시
    if (!user) {
      return {
        status: 401,
        message: "유효하지 않은 사용자입니다. 다시 입력해주세요.",
        data: data.name,
      }; // 로그인 실패 메시지
    }

    // 3. 로그인 성공 시, 사용자 이름을 포함한 메시지 반환
    const { password: _, ...userWithoutPassword } = user; // password 제외
    return {
      status: 200,
      message: `반갑습니다. ${user.name}님, 성공적으로 로그인되었습니다.`,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Error handling login:", error);
    throw new Error("로그인 처리 중 오류가 발생했습니다.");
  }
};

``;
