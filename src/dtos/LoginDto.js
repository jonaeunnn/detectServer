export const bodyToLogin = (body) => {
  const { username, password } = body;

  if (!username || !password) {
    const error = new Error("Both username and password are required");
    error.statusCode = 400; // Bad Request
    throw error;
  }

  return { username, password };
};
//logindto.js