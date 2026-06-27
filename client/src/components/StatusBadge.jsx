const getStatusClass = (status) => {
  const map = {
    Pending: 'status-pending',
    Confirmed: 'status-confirmed',
    Completed: 'status-completed',
    Cancelled: 'status-cancelled',
  };
  return map[status] || 'bg-secondary';
};

const StatusBadge = ({ status }) => (
  <span className={`badge ${getStatusClass(status)}`}>{status}</span>
);

export default StatusBadge;

export const getApprovalBadge = (status) => {
  const map = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    suspended: 'secondary',
  };
  return map[status] || 'secondary';
};
