import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info
};

function StatusMessage({ type = 'info', children }) {
  const Icon = icons[type] || Info;

  return (
    <div className={`status-message status-${type}`} role="alert">
      <Icon size={20} aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export default StatusMessage;
