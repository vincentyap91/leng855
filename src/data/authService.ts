type RegisterPayload = {
  username: string;
  mobileNumber: string;
  password: string;
  referralCode?: string;
};

type RegisterResponse = {
  success: true;
  userToken: string;
  username: string;
};

const DEMO_USER = "demo";
const DEMO_PASSWORD = "123456";

export const authService = {
  register(payload: RegisterPayload): Promise<RegisterResponse> {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve({
          success: true,
          userToken: `token_${payload.username}_${Date.now()}`,
          username: payload.username,
        });
      }, 1000);
    });
  },

  login(payload: { username: string; password: string }): Promise<{ username: string; userToken: string }> {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        const username = payload.username.trim();
        if (!username || !payload.password) {
          reject(new Error("Invalid username or password"));
          return;
        }
        if (username === DEMO_USER && payload.password === DEMO_PASSWORD) {
          resolve({
            username,
            userToken: `token_${username}_${Date.now()}`,
          });
          return;
        }
        reject(new Error("Invalid username or password"));
      }, 350);
    });
  },
};

