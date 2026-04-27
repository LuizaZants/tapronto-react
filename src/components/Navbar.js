import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const cuisines = [
  { label: 'Italiana', area: 'Italian' },
  { label: 'Portuguesa', area: 'Portuguese' },
  { label: 'Japonesa', area: 'Japanese' },
  { label: 'Mexicana', area: 'Mexican' },
  { label: 'Americana', area: 'American' },
  { label: 'Indiana', area: 'Indian' },
  { label: 'Francesa', area: 'French' },
  { label: 'Chinesa', area: 'Chinese' },
  { label: 'Tailandesa', area: 'Thai' },
  { label: 'Grega', area: 'Greek' },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-top">
        {/* Lado esquerdo vazio para centralizar o logo */}
        <div className="navbar-side" />

        <Link to="/" className="navbar-logo">
          Tá <span>Pronto!</span>
        </Link>

        <div className="navbar-side navbar-actions">
          <button className="navbar-btn" onClick={() => navigate('/buscar')} title="Buscar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="navbar-btn" onClick={() => navigate('/favoritos')} title="Favoritos">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="cuisine-bar">
        {cuisines.map((c, i) => (
          <span key={c.area} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && <span className="cuisine-separator">·</span>}
            <button
              className="cuisine-item"
              onClick={() => navigate(`/culinaria/${c.area}?label=${c.label}`)}
            >
              {c.label}
            </button>
          </span>
        ))}
      </div>
    </nav>
  );
}