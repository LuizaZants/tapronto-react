import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getMealById, getIngredients, getSteps,
  translateDish, translateArea, translateCategory,
  translateIngredient, translateText
} from '../services/mealService';
import './Detail.css';

const TABS = ['Ingredientes', 'Modo de Preparo', 'Nutricional'];

export default function Detail() {
  const { id } = useParams();
  const [meal, setMeal]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [activeTab, setActiveTab]     = useState(0);
  const [steps, setSteps]             = useState([]);
  const [translating, setTranslating] = useState(false);
  const [isFavorite, setIsFavorite]   = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getMealById(id);
        setMeal(data);
        if (data) {
          const rawSteps = getSteps(data.strInstructions);
          setSteps(rawSteps);
          translateSteps(rawSteps);
          // Verificar se é favorito
          const saved = JSON.parse(localStorage.getItem('tapronto_favorites') || '[]');
          setIsFavorite(saved.some(f => f.idMeal === id));
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const translateSteps = async (rawSteps) => {
    setTranslating(true);
    try {
      const translated = await Promise.all(rawSteps.map(s => translateText(s)));
      setSteps(translated);
    } catch {
      // mantém em inglês
    } finally {
      setTranslating(false);
    }
  };

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem('tapronto_favorites') || '[]');
    let updated;
    if (isFavorite) {
      updated = saved.filter(f => f.idMeal !== meal.idMeal);
    } else {
      updated = [...saved, meal];
    }
    localStorage.setItem('tapronto_favorites', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner" />
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="detail-not-found">
        <p>Receita não encontrada 😕</p>
        <Link to="/">← Voltar ao início</Link>
      </div>
    );
  }

  const name      = translateDish(meal.strMeal);
  const area      = translateArea(meal.strArea);
  const category  = translateCategory(meal.strCategory);
  const ingredients = getIngredients(meal);

  return (
    <div className="detail">
      {/* Hero */}
      <div className="detail-hero">
        <img src={meal.strMealThumb} alt={name} />
        <div className="detail-hero-gradient" />
      </div>

      {/* Conteúdo */}
      <div className="detail-content">
        {/* Tags */}
        <div className="detail-tags">
          <span className="detail-tag">{area}</span>
          <span className="detail-tag">{category}</span>
        </div>

        {/* Título */}
        <h1 className="detail-title">{name}</h1>

        {/* Stats */}
        <div className="detail-stats">
          <span>🥕 {ingredients.length} ingredientes</span>
          <span>📋 {steps.length} passos</span>
        </div>

        {/* Botão favoritar */}
        <button
          className={`detail-favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {isFavorite ? 'Salvo nos favoritos' : 'Salvar receita'}
        </button>

        {/* Tabs */}
        <div className="detail-tabs">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`detail-tab ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="detail-tab-line" />

        {/* Conteúdo da tab */}
        <div className="detail-tab-content">
          {activeTab === 0 && (
            <ul className="detail-ingredients">
              {ingredients.map(({ ingredient, measure }, i) => (
                <li key={i} className="detail-ingredient-item">
                  <span className="detail-ingredient-dot">•</span>
                  <span className="detail-ingredient-name">
                    {translateIngredient(ingredient)}
                  </span>
                  <span className="detail-ingredient-measure">{measure}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 1 && (
            <div className="detail-steps">
              {translating && steps.length === 0 ? (
                <div className="detail-translating">
                  <div className="spinner" />
                  <p>Traduzindo modo de preparo...</p>
                </div>
              ) : (
                steps.map((step, i) => (
                  <div key={i} className="detail-step">
                    <div className="detail-step-header">
                      <span className="detail-step-badge">Passo {i + 1}</span>
                      <div className="detail-step-line" />
                    </div>
                    <p className="detail-step-text">{step}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 2 && (
            <div className="detail-nutrition">
              <div className="detail-nutrition-info">
                <span>ℹ️</span>
                <p>Valores nutricionais estimados com base nos ingredientes da receita.</p>
              </div>
              <h3>Informações Nutricionais</h3>
              <p className="detail-nutrition-sub">Por porção (estimativa)</p>
              {[
                { label: '🔥 Calorias', value: '~350 kcal', ratio: 0.65 },
                { label: '💪 Proteínas', value: '~18g', ratio: 0.45 },
                { label: '🌾 Carboidratos', value: '~42g', ratio: 0.60 },
                { label: '🫒 Gorduras', value: '~12g', ratio: 0.30 },
                { label: '🥦 Fibras', value: '~5g', ratio: 0.38 },
                { label: '🧂 Sódio', value: '~420mg', ratio: 0.50 },
              ].map(({ label, value, ratio }) => (
                <div key={label} className="detail-nutrition-row">
                  <div className="detail-nutrition-header">
                    <span>{label}</span>
                    <span className="detail-nutrition-value">{value}</span>
                  </div>
                  <div className="detail-nutrition-bar">
                    <div
                      className="detail-nutrition-bar-fill"
                      style={{ width: `${ratio * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="detail-ingredients-wrap">
                <h4>Ingredientes</h4>
                <div className="detail-ingredient-tags">
                  {ingredients.map(({ ingredient }, i) => (
                    <span key={i} className="detail-ingredient-tag">
                      {translateIngredient(ingredient)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
