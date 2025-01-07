import { pool } from "../db.config.js";

// 주어진 username과 password로 사용자가 존재하는지 확인
export const findUserByCredentials = async (username, password) => {
  const conn = await pool.getConnection();

  try {
    // DB에서 username과 password로 유저 조회
    const [result] = await conn.query(
      `SELECT * FROM user WHERE username = ? AND password = ?`,
      [username, password]
    );
    console.log("Query result:", result); // 쿼리 결과 확인

    // 유저가 존재하면 반환, 없으면 null 반환
    if (result.length > 0) {
      return result[0]; // 첫 번째 일치하는 사용자 정보 반환
    } else {
      return null; // 일치하는 사용자 없으면 null 반환
    }
  } catch (err) {
    console.error("Error during query:", err);
    throw new Error(`Error finding user: ${err}`);
  } finally {
    conn.release();
  }
};
//login repositories
