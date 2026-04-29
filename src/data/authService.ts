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
};

