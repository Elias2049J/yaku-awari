import "./Notification.css";

const statusMap = {
  info: {
    className: "notification-info",
    label: "Info",
  },
  alerta: {
    className: "notification-atencion",
    label: "Atención",
  },
  atencion: {
    className: "notification-alerta",
    label: "Alerta",
  },
  peligro: {
    className: "notification-peligro",
    label: "¡Peligro!",
  },
  exito: {
    className: "notification-exito",
    label: "Éxito",
  },
};

function Notification({ status = "info", message }) {
  const { className, label } = statusMap[status] || statusMap.info;

  return (
    <div className={`notification ${className}`}>
      <strong>{label}: </strong>
      <span>{message}</span>
    </div>
  );
}

export default Notification;