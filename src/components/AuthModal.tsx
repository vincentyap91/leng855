import { useEffect, useState, type FormEvent } from "react";
import { assets } from "../data/assets";
import { authService } from "../data/authService";

export type AuthMode = "login" | "register";

const USER_MOBILE_KEY = "userMobile";

const LOGIN_ALERT_MESSAGE = "Invalid username or password";

type AuthModalProps = {
  isOpen: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
  onLoginSuccess?: (username: string, userToken?: string) => void;
  onRegisterSuccess?: (username: string, mobileNumber: string, userToken?: string) => void;
};

export function AuthModal({
  isOpen,
  mode,
  onClose,
  onModeChange,
  onLoginSuccess,
  onRegisterSuccess,
}: AuthModalProps) {
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerFieldErrors, setRegisterFieldErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setLoginError("");
      setRegisterError("");
      setRegisterFieldErrors({});
      setIsRegistering(false);
      return undefined;
    }

    setLoginError("");
    setRegisterError("");
    setRegisterFieldErrors({});
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");
    setRegisterError("");
    setRegisterFieldErrors({});
    const fd = new FormData(event.currentTarget);
    const isLoginMode = mode === "login";

    if (!isLoginMode) {
      const username = String(fd.get("username") ?? "").trim();
      const mobileNumber = String(fd.get("mobileNumber") ?? "").trim();
      const password = String(fd.get("password") ?? "").trim();
      const referralCode = String(fd.get("referralCode") ?? "").trim();
      const nextErrors: { username?: string; password?: string } = {};

      if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
        nextErrors.username = "Username must be 3-20 characters and use letters, numbers, or underscore.";
      }

      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        nextErrors.password = "Password must be 8+ characters and alphanumeric.";
      }

      if (Object.keys(nextErrors).length > 0) {
        setRegisterFieldErrors(nextErrors);
        return;
      }

      setIsRegistering(true);
      try {
        const fullMobileNumber = `+855${mobileNumber}`;
        const response = await authService.register({
          username,
          mobileNumber: fullMobileNumber,
          password,
          referralCode: referralCode || undefined,
        });
        localStorage.setItem(USER_MOBILE_KEY, fullMobileNumber);
        
        if (onRegisterSuccess) {
          onRegisterSuccess(response.username, fullMobileNumber, response.userToken);
        } else {
          onLoginSuccess?.(response.username, response.userToken);
        }
        
        onClose();
      } catch {
        setRegisterError("Registration failed. Please try again.");
      } finally {
        setIsRegistering(false);
      }
      return;
    }

    const username = String(fd.get("username") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    if (!username || !password) {
      setLoginError(LOGIN_ALERT_MESSAGE);
      return;
    }

    try {
      const result = await authService.login({ username, password });
      onLoginSuccess?.(result.username, result.userToken);
      onClose();
    } catch {
      setLoginError(LOGIN_ALERT_MESSAGE);
    }
  };

  const isLogin = mode === "login";
  const usernameLabel = isLogin
    ? "Enter Username or Phone Number"
    : "Enter Username";
  const usernamePlaceholder = isLogin
    ? "e.g: johndoe or 61123456789"
    : "e.g: johndoe or 61123456789";
  const passwordLabel = isLogin ? "Enter Password" : "Enter Your Password";
  const passwordPlaceholder = isLogin ? "Enter Password" : "";
  const submitLabel = isLogin ? "Log In" : "Register";
  const secondaryLabel = isLogin ? "Forgot Password" : "Back to Login";
  const promptPrefix = isLogin
    ? "Do not have an account yet?"
    : "Already have an account?";
  const promptAction = isLogin ? "Register Now!" : "Login Now!";

  return (
    <div
      className={`modal show ${isLogin ? "t3-auth-login-mode" : "t3-auth-register-mode"}`}
      role="dialog"
      tabIndex={-1}
      style={{ display: "block" }}
    >
      <button
        type="button"
        className="modal-backdrop"
        aria-label="Close authentication modal"
        onClick={onClose}
      />
      <div id="t3-login-register-modal" className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content t3-login-register-modal">
          <div className="modal-body">
            <div className="t3-lr-modal-container">
              <div className="t3-lr-modal-header">
                <div className="t3-logo">
                  <img src={assets.leng855Logo} className="img-responsive" alt="logo" />
                </div>
                <button type="button" className="t3-close-modal" onClick={onClose} aria-label="Close">
                  <svg className="vicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="t3-lr-modal-body">
                <div className={`left${isLogin ? " t3-lr-modal-left-stack" : ""}`}>
                  <div className="image">
                    <img
                      src="https://riocity-cdn.azureedge.net/riocity/login-register-202403302309448938.png"
                      className="img-responsive"
                      alt="BUILD THE BEST CASINO TOGETHER"
                    />
                  </div>
                  {isLogin ? (
                    <div
                      className={`t3-auth-login-alert-slot${loginError ? " t3-auth-login-alert-slot--open" : ""}`}
                      aria-live="polite"
                    >
                      {loginError ? (
                        <div className="t3-auth-login-alert rounded-lg px-4 py-2" role="alert">
                          <span className="t3-auth-login-alert__text">{loginError}</span>
                          <span className="t3-auth-login-alert__icon" aria-hidden>
                            <svg className="t3-auth-login-alert__icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <circle cx="12" cy="12" r="10" fill="currentColor" />
                              <path
                                d="M12 7v5M12 16h.01"
                                stroke="var(--surface-base)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <div className="right">
                  <form onSubmit={handleSubmit}>
                    <div className="t3-lr-form">
                      <div className="t3-input-container">
                        <label>{usernameLabel}</label>
                        <div>
                          <div className="form-group">
                            <input
                              name="username"
                              type="text"
                              className="t3-custom-input-text"
                              placeholder={usernamePlaceholder}
                              autoComplete="off"
                              id="loginUsername"
                              style={!isLogin && registerFieldErrors.username ? { borderColor: "var(--accent-strong)" } : undefined}
                            />
                          </div>
                          <small className="text-muted">
                            {isLogin
                              ? "Phone number must include country code (61xxxxxxxxx)"
                              : "Username can use letters, numbers, and underscore."}
                          </small>
                        </div>
                      </div>
                      {!isLogin && (
                        <div className="t3-input-container mt-3">
                          <label>Mobile Number</label>
                          <div className="t3-phone-field">
                            <select className="t3-custom-input-text t3-phone-code" defaultValue="+855">
                              <option value="+855">+855</option>
                              <option value="+60">+60</option>
                              <option value="+66">+66</option>
                            </select>
                            <input
                              name="mobileNumber"
                              type="tel"
                              className="t3-custom-input-text"
                              placeholder=""
                              autoComplete="tel"
                            />
                          </div>
                        </div>
                      )}
                      <div className="t3-input-container mt-3">
                        <label>{passwordLabel}</label>
                        <div className="position-relative">
                          <div className="form-group">
                            <input
                              name="password"
                              type="password"
                              className="t3-custom-input-text"
                              placeholder={passwordPlaceholder}
                              id="loginPassword"
                              autoComplete={isLogin ? "current-password" : "new-password"}
                              style={!isLogin && registerFieldErrors.password ? { borderColor: "var(--accent-strong)" } : undefined}
                            />
                          </div>
                          <div className="vicon-wrapper">
                            <svg className="vicon" viewBox="0 0 1024 1024" aria-hidden="true">
                              <path d="M945.942 14.058c-18.746-18.744-49.136-18.744-67.882 0l-202.164 202.164c-51.938-15.754-106.948-24.222-163.896-24.222-223.318 0-416.882 130.042-512 320 41.122 82.124 100.648 153.040 173.022 207.096l-158.962 158.962c-18.746 18.746-18.746 49.136 0 67.882 9.372 9.374 21.656 14.060 33.94 14.060s24.568-4.686 33.942-14.058l864-864c18.744-18.746 18.744-49.138 0-67.884zM416 320c42.24 0 78.082 27.294 90.92 65.196l-121.724 121.724c-37.902-12.838-65.196-48.68-65.196-90.92 0-53.020 42.98-96 96-96zM110.116 512c38.292-60.524 89.274-111.924 149.434-150.296 3.918-2.5 7.876-4.922 11.862-7.3-9.962 27.328-15.412 56.822-15.412 87.596 0 54.89 17.286 105.738 46.7 147.418l-60.924 60.924c-52.446-36.842-97.202-83.882-131.66-138.342z" />
                              <path d="M768 442c0-27.166-4.256-53.334-12.102-77.898l-321.808 321.808c24.568 7.842 50.742 12.090 77.91 12.090 141.382 0 256-114.618 256-256z" />
                              <path d="M830.026 289.974l-69.362 69.362c1.264 0.786 2.53 1.568 3.786 2.368 60.162 38.374 111.142 89.774 149.434 150.296-38.292 60.522-89.274 111.922-149.436 150.296-75.594 48.218-162.89 73.704-252.448 73.704-38.664 0-76.902-4.76-113.962-14.040l-76.894 76.894c59.718 21.462 123.95 33.146 190.856 33.146 223.31 0 416.876-130.042 512-320-45.022-89.916-112.118-166.396-193.974-222.026z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {!isLogin && (
                        <div className="t3-register-rules">
                          <p>Include at least 8 characters, containing both a letter and a number, with no symbols allowed.</p>
                          <p>Only letters (A-Z, a-z) and numbers (0-9).</p>
                          <p>No special characters / symbols.</p>
                        </div>
                      )}
                      {!isLogin && (
                        <div className="t3-input-container mt-3">
                          <label>Key In Your Referral Code (Optional)</label>
                          <div className="form-group">
                            <input
                              name="referralCode"
                              type="text"
                              className="t3-custom-input-text"
                              placeholder=""
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      )}
                      {isLogin && (
                        <div className="t3-input-container mt-3">
                          <div className="d-flex align-items-center">
                            <div className="remenber-me-check">
                              <label>
                                <input type="checkbox" name="isKeepedLogin" />
                                <span className="ml-2">Remember Me</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                      {!isLogin && (registerFieldErrors.username || registerFieldErrors.password || registerError) ? (
                        <p className="m-0 mt-2 text-[13px] font-semibold" style={{ color: "var(--accent-strong)" }}>
                          {registerFieldErrors.username ?? registerFieldErrors.password ?? registerError}
                        </p>
                      ) : null}
                      <div className="t3-lr-button-box mt-4">
                        <div style={!isLogin ? { flex: "0 0 auto" } : { flex: "1" }}>
                          <button
                            className={isLogin ? "" : "t3-profile-action-btn"}
                            type="submit"
                            disabled={!isLogin && isRegistering}
                            style={isLogin ? {
                              background: "var(--accent-strong)",
                              color: "var(--text-on-emphasis)",
                              border: "none",
                              borderRadius: "10px",
                              minHeight: "44px",
                              width: "100%",
                              fontSize: "16px",
                              fontWeight: 700,
                              cursor: "pointer",
                              boxShadow: "0 2px 4px color-mix(in srgb, var(--surface-inverse) 10%, transparent)",
                              transition: "opacity 0.2s"
                            } : { background: "var(--cta-gradient)" }}
                          >
                            {!isLogin && isRegistering ? (
                              <span className="inline-flex items-center gap-2">
                                <span
                                  aria-hidden
                                  className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--text-on-emphasis)] border-t-transparent"
                                />
                                Registering...
                              </span>
                            ) : (
                              submitLabel
                            )}
                          </button>
                        </div>
                        {isLogin && (
                          <div style={{ flex: "1.2" }}>
                            <button
                              type="button"
                              onClick={() => {
                                if (!isLogin) {
                                  onModeChange("login");
                                }
                              }}
                              style={{
                                background: "var(--surface-muted)",
                                border: "1px solid var(--border-default)",
                                color: "var(--text-primary)",
                                borderRadius: "10px",
                                minHeight: "44px",
                                width: "100%",
                                fontSize: "15px",
                                fontWeight: 700,
                                cursor: "pointer",
                                transition: "background 0.2s"
                              }}
                            >
                              {secondaryLabel}
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="t3-lr-modal-footer mt-3">
                        <div className="t3-lr-button-box">
                          <span className={!isLogin ? "text-[14px]" : undefined} style={isLogin ? { color: "var(--accent-strong)", fontWeight: 500 } : undefined}>{promptPrefix}</span>{" "}
                          <button
                            className="header-login-btn"
                            type="button"
                            onClick={() => onModeChange(isLogin ? "register" : "login")}
                            style={isLogin ? { color: "var(--accent-soft)", fontWeight: 700, textDecoration: "underline" } : undefined}
                          >
                            {promptAction}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
