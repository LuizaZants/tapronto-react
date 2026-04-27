import { Link } from 'react-router-dom';
import { translateDish, translateArea, translateCategory } from '../services/mealService';
import './MealCard.css';

export default function MealCard({ meal }) {
  const name = translateDish(meal.strMeal || meal.name || '');
  const area = meal.strArea ? translateArea(meal.strArea) : null;
  const category = meal.strCategory ? translateCategory(meal.strCategory) : null;
  const thumb = meal.strMealThumb || meal.thumbUrl || '';
  const id = meal.idMeal || meal.id || '';

  const meta = [area, category].filter(Boolean).join(' · ');

  return (
    <Link to={`/receita/${id}`} className="meal-card">
      <div className="meal-card-image">
        <img src={thumb} alt={name} loading="lazy" />
        <div className="meal-card-overlay" />
      </div>
      <div className="meal-card-info">
        {meta && <p className="meal-card-meta">{meta}</p>}
        <h3 className="meal-card-title">{name}</h3>
        <span className="meal-card-link">Ver receita →</span>
      </div>
    </Link>
  );
}
