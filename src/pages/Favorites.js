import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { translateDish, translateArea, translateCategory } from '../services/mealService';
import './Favorites.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tapronto_favorites') || '[]');
    setFavorites(saved);
  }, []);

  const remove = (id) => {
    const updated = favorites.filter(f => f.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem('tapronto_favorites', JSON.stringify(updated));
  };

  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Minhas Receitas</h1>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <p>🍽️</p>
          <p className="favorites-empty-title">Nenhuma receita salva ainda</p>
          <p className="favorites-empty-sub">Explore e salve suas receitas favoritas</p>
          <Link to="/" className="favorites-back-btn">Explorar receitas</Link>
        </div>
      ) : (
        <>
          <p className="favorites-count">{favorites.length} receita{favorites.length > 1 ? 's' : ''} salva{favorites.length > 1 ? 's' : ''}</p>
          <div className="favorites-list">
            {favorites.map(meal => (
              <div key={meal.idMeal} className="favorites-item">
                <Link to={`/receita/${meal.idMeal}`} className="favorites-item-link">
                  <img src={meal.strMealThumb} alt={meal.strMeal} />
                  <div className="favorites-item-info">
                    <p className="favorites-item-meta">
                      {[translateArea(meal.strArea), translateCategory(meal.strCategory)]
                        .filter(Boolean).join(' · ')}
                    </p>
                    <h3 className="favorites-item-title">
                      {translateDish(meal.strMeal)}
                    </h3>
                    <span className="favorites-item-link-text">Ver receita →</span>
                  </div>
                </Link>
                <button className="favorites-remove" onClick={() => remove(meal.idMeal)}>✕</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
