import { useEffect } from "react";

function AlertMessage({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className={type === "success" ? "success-message" : "error-message"}>
      {type === "success" ? "✅" : "❌"} {message}
    </div>
  );
}

export default AlertMessage;
