export default function Badge({ variant = 'muted', children }) {
    const cls = {
      success: 'badge-success',
      warning: 'badge-warning',
      danger: 'badge-danger',
      info: 'badge-info',
      muted: 'badge-muted',
    }[variant];
    return <span className={cls}>{children}</span>;
  }