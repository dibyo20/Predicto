import { useState } from "react";


export default function InputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  showPasswordToggle = false,
  required = false,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const currentType = isPassword && showPasswordToggle && showPassword ? "text" : type;

  return (
    <div className="field">
      {label && (
        <label htmlFor={id} className="field__label">
          {label}
        </label>
      )}
      <div className="input-wrap">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          id={id}
          type={currentType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          className={`input-field ${icon ? "input-field--has-icon" : ""} ${
            isPassword && showPasswordToggle ? "input-field--has-toggle" : ""
          }`}
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Active state: Display input password text characters
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="eye-icon"
                width="20"
                height="20"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // Masked state: Conceal input password characters
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="eye-icon"
                width="20"
                height="20"
              >
                <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.244z" />
                <path d="M6.25 12c0-.556.086-1.091.245-1.595L3.488 7.398a11.285 11.285 0 00-2.165 4.055 1.76 1.76 0 000 1.113c1.487 4.47 5.705 7.697 10.677 7.697.876 0 1.73-.102 2.55-.294l-2.735-2.735A5.228 5.228 0 0112 12.75c-.25 0-.493-.017-.732-.05l-.018-.002a5.25 5.25 0 01-5-5v-.012c-.004-.045-.008-.09-.008-.136z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}


