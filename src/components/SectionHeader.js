import { useNavigate } from 'react-router-dom';
import './SectionHeader.css';

export default function SectionHeader({ title, subtitle, actionLabel, actionTo }) {
  const navigate = useNavigate();

  return (
    <div className="section-header">
      <div className="section-header-row">
        <div className="section-header-line" />
        <h2 className="section-header-title">{title}</h2>
        <div className="section-header-line" />
      </div>
      {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
      {actionLabel && actionTo && (
        <button className="section-header-action" onClick={() => navigate(actionTo)}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
