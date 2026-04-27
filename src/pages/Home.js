import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  searchByCategory, searchByArea,
  translateArea, translateCategory, translateDish
} from '../services/mealService';
import MealCard from '../components/MealCard';
import SectionHeader from '../components/SectionHeader';
import '../components/CategoryCard.css';
import './Home.css';

const CATEGORIES = [
  { label: 'Aperitivos',      category: 'Starter' },
  { label: 'Carnes',          category: 'Beef' },
  { label: 'Aves',            category: 'Chicken' },
  { label: 'Peixes',          category: 'SeafoodPeixes' },
  { label: 'Sem carne',       category: 'Vegetarian' },
  { label: 'Acompanhamentos', category: 'Side' },
  { label: 'Frutos do mar',   category: 'Seafood' },
  { label: 'Massas',          category: 'Pasta' },
  { label: 'Sobremesas',      category: 'Dessert' },
];

const MEAL_TYPES = [
  { label: 'Café da manhã', category: 'Breakfast' },
  { label: 'Almoço',        category: 'Beef' },
  { label: 'Happy hour',    category: 'Starter' },
  { label: 'Jantar',        category: 'Pasta' },
];

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [seafood, setSeafood]   = useState([]);
  const [dessert, setDessert]   = useState([]);
  const [categoryImages, setCategoryImages] = useState({});
  const [mealTypeImages, setMealTypeImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [chicken, sea, des, breakfast, beef, pasta, starter, veg, side] =
          await Promise.all([
            searchByCategory('Chicken'),
            searchByCategory('Seafood'),
            searchByCategory('Dessert'),
            searchByCategory('Breakfast'),
            searchByCategory('Beef'),
            searchByCategory('Pasta'),
            searchByCategory('Starter'),
            searchByCategory('Vegetarian'),
            searchByCategory('Side'),
          ]);

        // Receitas em alta escolhidas + 2 últimas do chicken
        const featuredIds = ['53248', '52844', '53207', '53278'];
        const featuredSpecific = await Promise.all(
          featuredIds.map(id =>
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
              .then(r => r.json())
              .then(d => d.meals?.[0] || null)
          )
        );
        const featuredFiltered = featuredSpecific.filter(Boolean);
        const lastTwo = chicken.slice(4, 6);
        setFeatured([...featuredFiltered, ...lastTwo]);
        setSeafood(sea.slice(0, 4));
        // Sobremesas escolhidas manualmente — as mais bonitas!
        const dessertIds = ['53303', '52989', '52859', '52931'];
        const dessertSpecific = await Promise.all(
          dessertIds.map(id =>
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
              .then(r => r.json())
              .then(d => d.meals?.[0] || null)
          )
        );
        const dessertFiltered = dessertSpecific.filter(Boolean);
        setDessert(dessertFiltered.length >= 4 ? dessertFiltered : des.slice(0, 4));

        // Mapear imagens de categorias
        const catImgs = {};
        const getImg = (list, idx = 0) => list.filter(m => m.strMealThumb)[idx]?.strMealThumb || list.find(m => m.strMealThumb)?.strMealThumb || '';
        catImgs['Starter']       = getImg(starter);
        catImgs['Beef']          = getImg(beef, 4);
        catImgs['Chicken']       = getImg(chicken, 2);
        catImgs['Seafood']       = getImg(sea, 0);
        catImgs['SeafoodPeixes'] = getImg(sea, 3);
        catImgs['Vegetarian']    = getImg(veg);
        catImgs['Side']          = getImg(side);
        catImgs['Pasta']         = getImg(pasta);
        catImgs['Dessert']       = getImg(des);
        setCategoryImages(catImgs);

        // Mapear imagens de refeições do dia
        // Buscar imagens específicas por ID
        const [dessertFixed, chickenFixed, breakfastFixed] = await Promise.all([
          fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53316').then(r => r.json()),
          fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53261').then(r => r.json()),
          fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53331').then(r => r.json()),
        ]);

        const dessertImg   = dessertFixed.meals?.[0]?.strMealThumb || getImg(des);
        const chickenImg   = chickenFixed.meals?.[0]?.strMealThumb || getImg(chicken, 2);
        const breakfastImg = breakfastFixed.meals?.[0]?.strMealThumb || getImg(breakfast);

        catImgs['Chicken'] = chickenImg;
        catImgs['Dessert'] = dessertImg;

        // Buscar imagem específica para Almoço
        const almoco = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53366')
          .then(r => r.json());
        const almocoImg = almoco.meals?.[0]?.strMealThumb || getImg(beef, 4);

        setMealTypeImages({
          Breakfast: breakfastImg,
          Beef:      almocoImg,
          Starter:   getImg(starter),
          Pasta:     getImg(pasta),
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="home-loading">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="home">
      {/* CATEGORIAS */}
      <section className="home-section">
        <SectionHeader
          title="FAÇA SUA BUSCA AQUI"
          subtitle="NAVEGUE POR CATEGORIA"
        />
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="category-card"
              onClick={() => navigate(`/categoria/${cat.category === 'SeafoodPeixes' ? 'Seafood' : cat.category}?label=${cat.label}`)}
            >
              <div className="category-card-image">
                {categoryImages[cat.category] ? (
                  <img src={categoryImages[cat.category]} alt={cat.label} loading="lazy" />
                ) : (
                  <div style={{ background: 'var(--cream)', width: '100%', height: '100%' }} />
                )}
                <div className="category-card-overlay" />
                <span className="category-card-overlay-label">{cat.label}</span>
              </div>
              <p className="category-card-label">{cat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="home-divider" />

      {/* QUAL SUA PRÓXIMA REFEIÇÃO */}
      <section className="home-section">
        <SectionHeader
          title="QUAL SUA PRÓXIMA REFEIÇÃO?"
          subtitle="A GENTE TEM A IDEIA PERFEITA"
        />
        <div className="meal-type-row">
          {MEAL_TYPES.map((mt) => (
            <div
              key={mt.label}
              className="meal-type-card"
              onClick={() => navigate(`/categoria/${mt.category}?label=${mt.label}`)}
            >
              <div className="meal-type-image">
                {mealTypeImages[mt.category] ? (
                  <img src={mealTypeImages[mt.category]} alt={mt.label} loading="lazy" />
                ) : (
                  <div style={{ background: 'var(--cream)', width: '100%', height: '100%' }} />
                )}
                <div className="meal-type-overlay" />
              </div>
              <p className="meal-type-label">{mt.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="home-divider" />

      {/* EM ALTA */}
      {featured.length > 0 && (
        <section className="home-section">
          <SectionHeader title="EM ALTA" subtitle="RECEITAS MAIS BUSCADAS" />
          <div className="meals-grid" style={{ padding: '0 40px' }}>
            {featured.map(meal => <MealCard key={meal.idMeal} meal={meal} />)}
          </div>
        </section>
      )}

      <div className="home-divider" />

      {/* FRUTOS DO MAR */}
      {seafood.length > 0 && (
        <section className="home-section">
          <SectionHeader
            title="FRUTOS DO MAR"
            subtitle="FRESCOR DO OCEANO NA SUA MESA"
            actionLabel="VER TODAS"
            actionTo="/categoria/Seafood?label=Frutos do Mar"
          />
          <div className="meals-grid-4" style={{ padding: '0 40px' }}>
            {seafood.map(meal => <MealCard key={meal.idMeal} meal={meal} />)}
          </div>
        </section>
      )}

      <div className="home-divider" />

      {/* SOBREMESAS */}
      {dessert.length > 0 && (
        <section className="home-section">
          <SectionHeader
            title="SOBREMESAS"
            subtitle="ADOCE O SEU DIA"
            actionLabel="VER TODAS"
            actionTo="/categoria/Dessert?label=Sobremesas"
          />
          <div className="meals-grid-4" style={{ padding: '0 40px' }}>
            {dessert.map(meal => <MealCard key={meal.idMeal} meal={meal} />)}
          </div>
        </section>
      )}

      <div style={{ height: 60 }} />
    </div>
  );
}