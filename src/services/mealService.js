const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Dicionário PT → EN para busca
const ptToEn = {
  'frango': 'chicken', 'galinha': 'chicken', 'carne': 'beef',
  'porco': 'pork', 'peixe': 'fish', 'salmão': 'salmon',
  'camarão': 'shrimp', 'massa': 'pasta', 'macarrão': 'pasta',
  'espaguete': 'spaghetti', 'lasanha': 'lasagna', 'risoto': 'risotto',
  'sopa': 'soup', 'salada': 'salad', 'bolo': 'cake', 'torta': 'pie',
  'pizza': 'pizza', 'hamburguer': 'burger', 'curry': 'curry',
  'ovo': 'egg', 'ovos': 'eggs', 'queijo': 'cheese', 'tomate': 'tomato',
  'batata': 'potato', 'arroz': 'rice', 'feijão': 'beans',
  'sobremesa': 'dessert', 'pudim': 'pudding', 'panqueca': 'pancake',
  'yakisoba': 'yakisoba', 'sushi': 'sushi', 'ramen': 'ramen',
  'tacos': 'tacos', 'strogonoff': 'stroganoff', 'pato': 'duck',
  'cordeiro': 'lamb', 'atum': 'tuna', 'bacalhau': 'cod',
};

// Dicionário EN → PT para exibição
const dishTranslations = {
  'chicken': 'Frango', 'beef': 'Carne Bovina', 'lamb': 'Cordeiro',
  'pork': 'Porco', 'fish': 'Peixe', 'salmon': 'Salmão',
  'pasta': 'Massa', 'spaghetti': 'Espaguete', 'lasagna': 'Lasanha',
  'lasagne': 'Lasanha', 'risotto': 'Risoto', 'soup': 'Sopa',
  'salad': 'Salada', 'cake': 'Bolo', 'pie': 'Torta',
  'pizza': 'Pizza', 'burger': 'Hambúrguer', 'curry': 'Curry',
  'stew': 'Ensopado', 'roast': 'Assado', 'fried': 'Frito',
  'grilled': 'Grelhado', 'baked': 'Assado no Forno',
  'stuffed': 'Recheado', 'bread': 'Pão', 'rice': 'Arroz',
  'potato': 'Batata', 'potatoes': 'Batatas', 'egg': 'Ovo', 'eggs': 'Ovos',
  'cheese': 'Queijo', 'tomato': 'Tomate', 'mushroom': 'Cogumelo',
  'onion': 'Cebola', 'garlic': 'Alho', 'sweet': 'Doce',
  'noodles': 'Macarrão', 'dumplings': 'Bolinhos',
  'pancake': 'Panqueca', 'pudding': 'Pudim', 'brownie': 'Brownie',
  'steak': 'Bife', 'wings': 'Asas', 'meatballs': 'Almôndegas',
  'tacos': 'Tacos', 'shrimp': 'Camarão', 'prawn': 'Camarão',
  'with': 'com', 'and': 'e', 'sauce': 'ao Molho',
  'chocolate': 'Chocolate', 'vanilla': 'Baunilha',
  'strawberry': 'Morango', 'banana': 'Banana', 'mango': 'Manga',
  'coconut': 'Coco', 'lemon': 'com Limão', 'honey': 'com Mel',
};

const areaTranslations = {
  'Italian': 'Italiana', 'Brazilian': 'Brasileira', 'Japanese': 'Japonesa',
  'Mexican': 'Mexicana', 'American': 'Americana', 'Indian': 'Indiana',
  'French': 'Francesa', 'Chinese': 'Chinesa', 'Thai': 'Tailandesa',
  'Greek': 'Grega', 'Spanish': 'Espanhola', 'British': 'Britânica',
  'Canadian': 'Canadense', 'Moroccan': 'Marroquina', 'Russian': 'Russa',
  'Turkish': 'Turca', 'Vietnamese': 'Vietnamita', 'Filipino': 'Filipina',
  'Jamaican': 'Jamaicana', 'Croatian': 'Croata', 'Dutch': 'Holandesa',
  'Egyptian': 'Egípcia', 'Irish': 'Irlandesa', 'Kenyan': 'Queniana',
  'Malaysian': 'Malaia', 'Polish': 'Polonesa', 'Portuguese': 'Portuguesa',
  'Unknown': 'Desconhecida',
};

const categoryTranslations = {
  'Beef': 'Carne Bovina', 'Chicken': 'Frango', 'Lamb': 'Cordeiro',
  'Pork': 'Porco', 'Seafood': 'Frutos do Mar', 'Pasta': 'Massas',
  'Vegetarian': 'Sem Carne', 'Dessert': 'Sobremesas',
  'Breakfast': 'Café da Manhã', 'Side': 'Acompanhamentos',
  'Starter': 'Aperitivos', 'Goat': 'Cabrito', 'Vegan': 'Vegano',
  'Miscellaneous': 'Variados',
};

const ingredientTranslations = {
  'chicken': 'Frango', 'beef': 'Carne Bovina', 'lamb': 'Cordeiro',
  'pork': 'Porco', 'bacon': 'Bacon', 'sausage': 'Linguiça',
  'fish': 'Peixe', 'salmon': 'Salmão', 'tuna': 'Atum',
  'shrimp': 'Camarão', 'prawn': 'Camarão', 'crab': 'Caranguejo',
  'oil': 'Azeite', 'olive oil': 'Azeite de Oliva', 'butter': 'Manteiga',
  'cream': 'Creme de Leite', 'milk': 'Leite', 'cheese': 'Queijo',
  'egg': 'Ovo', 'eggs': 'Ovos', 'flour': 'Farinha', 'sugar': 'Açúcar',
  'salt': 'Sal', 'pepper': 'Pimenta', 'black pepper': 'Pimenta Preta',
  'onion': 'Cebola', 'garlic': 'Alho', 'ginger': 'Gengibre',
  'tomato': 'Tomate', 'tomatoes': 'Tomates', 'tomato puree': 'Extrato de Tomate',
  'potato': 'Batata', 'potatoes': 'Batatas', 'carrot': 'Cenoura',
  'celery': 'Aipo', 'mushroom': 'Cogumelo', 'mushrooms': 'Cogumelos',
  'spinach': 'Espinafre', 'lettuce': 'Alface', 'broccoli': 'Brócolis',
  'zucchini': 'Abobrinha', 'corn': 'Milho', 'peas': 'Ervilha',
  'beans': 'Feijão', 'lentils': 'Lentilhas', 'chickpeas': 'Grão-de-Bico',
  'rice': 'Arroz', 'pasta': 'Massa', 'bread': 'Pão',
  'soy sauce': 'Molho Shoyu', 'fish sauce': 'Molho de Peixe',
  'worcestershire sauce': 'Molho Inglês', 'vinegar': 'Vinagre',
  'lemon': 'Limão', 'lime': 'Lima', 'lemon juice': 'Suco de Limão',
  'honey': 'Mel', 'sugar': 'Açúcar', 'chocolate': 'Chocolate',
  'vanilla': 'Baunilha', 'cinnamon': 'Canela', 'cumin': 'Cominho',
  'paprika': 'Páprica', 'turmeric': 'Açafrão', 'oregano': 'Orégano',
  'basil': 'Manjericão', 'thyme': 'Tomilho', 'rosemary': 'Alecrim',
  'parsley': 'Salsinha', 'cilantro': 'Coentro', 'bay leaf': 'Louro',
  'chili': 'Pimenta', 'curry powder': 'Curry em Pó',
  'chicken stock': 'Caldo de Frango', 'beef stock': 'Caldo de Carne',
  'white wine': 'Vinho Branco', 'red wine': 'Vinho Tinto', 'water': 'Água',
  'baking powder': 'Fermento em Pó', 'cornstarch': 'Amido de Milho',
  'olive': 'Azeitona', 'olives': 'Azeitonas', 'chorizo': 'Chorizo',
  'mozzarella': 'Mussarela', 'parmesan': 'Parmesão', 'feta': 'Queijo Feta',
  'ricotta': 'Ricota', 'cream cheese': 'Cream Cheese', 'yogurt': 'Iogurte',
  'coconut milk': 'Leite de Coco', 'almond': 'Amêndoa', 'walnut': 'Nozes',
  'peanut': 'Amendoim', 'sesame': 'Gergelim', 'strawberry': 'Morango',
  'banana': 'Banana', 'apple': 'Maçã', 'mango': 'Manga',
  'avocado': 'Abacate', 'red pepper': 'Pimentão Vermelho',
  'green pepper': 'Pimentão Verde', 'spring onion': 'Cebolinha',
  'leek': 'Alho-Poró', 'sweet potato': 'Batata Doce',
  'spaghetti': 'Espaguete', 'penne': 'Penne', 'noodles': 'Macarrão',
};

export const translateDish = (name) => {
  if (!name) return name;
  let result = name;
  const keepOriginal = [
    'sushi', 'ramen', 'tempura', 'udon', 'miso', 'teriyaki',
    'tikka', 'masala', 'biryani', 'dal', 'naan', 'paella',
    'gazpacho', 'churros', 'croissant', 'quiche', 'ratatouille',
    'tiramisu', 'bruschetta', 'carpaccio', 'gnocchi', 'guacamole',
    'quesadilla', 'enchilada', 'stroganoff', 'goulash', 'hummus',
    'falafel', 'shawarma', 'kebab', 'dim sum', 'pad thai', 'pho',
    'satay', 'jerk', 'jollof', 'yakisoba',
  ];
  if (keepOriginal.some(k => name.toLowerCase().includes(k))) return name;
  Object.entries(dishTranslations).forEach(([en, pt]) => {
    if (!pt) {
      result = result.replace(new RegExp(`\\b${en}\\b`, 'gi'), '');
    } else {
      result = result.replace(new RegExp(`\\b${en}\\b`, 'gi'), pt);
    }
  });
  return result.replace(/\s+/g, ' ').trim() || name;
};

export const translateArea = (area) => areaTranslations[area] || area;
export const translateCategory = (cat) => categoryTranslations[cat] || cat;
export const translateIngredient = (ing) => {
  if (!ing) return ing;
  const lower = ing.toLowerCase().trim();
  if (ingredientTranslations[lower]) return ingredientTranslations[lower];
  for (const [en, pt] of Object.entries(ingredientTranslations)) {
    if (lower.includes(en)) return pt;
  }
  return ing.charAt(0).toUpperCase() + ing.slice(1);
};

export const translateSearch = (query) => {
  const lower = query.toLowerCase().trim();
  if (ptToEn[lower]) return ptToEn[lower];
  for (const [pt, en] of Object.entries(ptToEn)) {
    if (lower.includes(pt)) return en;
  }
  return query;
};

// API calls
export const searchByName = async (query) => {
  const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
  const data = await res.json();
  return data.meals || [];
};

export const searchByIngredient = async (ingredient) => {
  const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
  const data = await res.json();
  return data.meals || [];
};

export const searchByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
  const data = await res.json();
  return data.meals || [];
};

export const searchByArea = async (area) => {
  const res = await fetch(`${BASE_URL}/filter.php?a=${area}`);
  const data = await res.json();
  return data.meals || [];
};

export const getMealById = async (id) => {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
};

export const getIngredients = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (ingredient) ingredients.push({ ingredient, measure: measure || '' });
  }
  return ingredients;
};

export const getSteps = (instructions) => {
  if (!instructions) return [];
  const stepMarker = /^(step|passo|etapa|parte|phase|stage)\s*\d+\.?$/i;
  return instructions
    .split(/\r\n|\n|\r/)
    .map(s => s.trim())
    .filter(s => s.length > 10 && !stepMarker.test(s));
};

export const translateText = async (text) => {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0].map(item => item[0]).join('');
  } catch {
    return text;
  }
};