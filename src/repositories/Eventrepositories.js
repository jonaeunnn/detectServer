import { pool } from "../db.config.js";

// event_log 테이블에 이벤트 기록
export const addEventLog = async ({ event_type, confidence, user_id }) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO event_logs (event_type, confidence,user_id) VALUES (?, ?,?);`,
      [event_type, confidence, user_id]
    );
    return {
      id: result.insertId,
      event_type,
      confidence,
      user_id,

      detected_at: new Date(),
    };
  } catch (err) {
    throw new Error(`Event log creation failed: ${err}`);
  } finally {
    conn.release();
  }
};

// violence_event 테이블에 scream_level 기록 (violence 이벤트인 경우만)
export const addViolenceEvent = async ({ event_id, scream_level }) => {
  const conn = await pool.getConnection();

  try {
    await conn.query(
      `INSERT INTO scream_logs (event_id, scream_level) VALUES (?, ?);`,
      [event_id, scream_level]
    );
  } catch (err) {
    throw new Error(`Violence event logging failed: ${err}`);
  } finally {
    conn.release();
  }
};

// user_id에 해당하는 이벤트 로그를 조회
export const getEventLogsByUserId = async (user_id) => {
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query(
      `SELECT id, event_type, detected_at, confidence FROM event_logs WHERE user_id = ?`,
      [user_id]
    );

    return rows; // 조회된 event_logs 배열 반환
  } catch (err) {
    throw new Error(`Failed to get event logs: ${err}`);
  } finally {
    conn.release();
  }
};
