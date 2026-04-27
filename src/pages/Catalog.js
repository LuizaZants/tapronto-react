import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { searchByCategory, searchByArea } from '../services/mealService';
import MealCard from '../components/MealCard';
import SectionHeader from '../components/SectionHeader';
import './Catalog.css';

export default function Catalog({ type }) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const label = searchParams.get('label') || id;

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const results = type === 'area'
          ? await searchByArea(id)
          : await searchByCategory(id);
        setMeals(results);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, type]);

  return (
    <div className="catalog">
      <div className="catalog-header">
        <SectionHeader title={label.toUpperCase()} />
        {!loading && (
          <p className="catalog-count">{meals.length} receitas encontradas</p>
        )}
      </div>

      {loading ? (
        <div className="catalog-loading">
          <div className="spinner" />
          <p>Buscando receitas...</p>
        </div>
      ) : meals.length === 0 ? (
        <div className="catalog-empty">
          <p>Nenhuma receita encontrada 😕</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {meals.map(meal => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
