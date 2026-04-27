import { useState } from 'react';
import { searchByName, searchByIngredient, translateSearch } from '../services/mealService';
import MealCard from '../components/MealCard';
import './Search.css';

const SUGGESTIONS = ['Frango', 'Lasanha', 'Sopa', 'Salada', 'Bolo', 'Peixe', 'Massa', 'Curry', 'Ovo', 'Camarão'];

export default function Search() {
  const [query, setQuery]           = useState('');
  const [results, setResults]       = useState([]);
  const [loading, setLoading]       = useState(false);
  const [searched, setSearched]     = useState(false);
  const [byIngredient, setByIngredient] = useState(false);

  const handleSearch = async (q = query) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const translated = translateSearch(q);
      const data = byIngredient
        ? await searchByIngredient(translated)
        : await searchByName(translated);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">Buscar Receitas</h1>

        {/* Campo de busca */}
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder={byIngredient ? 'Ex: frango, tomate, alho...' : 'Ex: lasanha, sopa, bolo...'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            autoFocus
          />
          <button className="search-btn" onClick={() => handleSearch()}>
            Buscar
          </button>
        </div>

        {/* Toggle */}
        <div className="search-toggle">
          <span>Buscar por:</span>
          <button
            className={`search-toggle-btn ${!byIngredient ? 'active' : ''}`}
            onClick={() => setByIngredient(false)}
          >
            Nome
          </button>
          <button
            className={`search-toggle-btn ${byIngredient ? 'active' : ''}`}
            onClick={() => setByIngredient(true)}
          >
            Ingrediente
          </button>
        </div>
      </div>

      {/* Sugestões */}
      {!searched && (
        <div className="search-suggestions">
          <p className="search-suggestions-title">Sugestões de busca</p>
          <div className="search-suggestions-list">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                className="search-suggestion-btn"
                onClick={() => { setQuery(s); handleSearch(s); }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resultados */}
      {loading ? (
        <div className="search-loading">
          <div className="spinner" />
          <p>Buscando receitas...</p>
        </div>
      ) : searched && results.length === 0 ? (
        <div className="search-empty">
          <p>🔍 Nenhuma receita encontrada para "{query}"</p>
          <p className="search-empty-sub">Tente outro termo ou ingrediente</p>
        </div>
      ) : searched && (
        <div className="search-results">
          <p className="search-count">{results.length} receitas encontradas</p>
          <div className="search-grid">
            {results.map(meal => <MealCard key={meal.idMeal} meal={meal} />)}
          </div>
        </div>
      )}
    </div>
  );
}
