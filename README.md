# 🍲 Tá Pronto! — Web (React)

> Catálogo de receitas do mundo todo, com busca por nome e ingrediente, modo de preparo traduzido e favoritos.

---

## 📱 Sobre o projeto

O **Tá Pronto!** é uma aplicação web desenvolvida em **React** que consome a [TheMealDB API](https://www.themealdb.com/api.php) para exibir receitas de diversas culinárias do mundo. Possui rotas dinâmicas, tradução automática das instruções e sistema de favoritos.

---

## ✨ Funcionalidades

- 🏠 **Home** com categorias, culinárias e seções de destaque
- 🔍 **Busca** por nome do prato ou ingrediente (em português!)
- 📖 **Detalhes** de cada receita com ingredientes e modo de preparo traduzido
- ❤️ **Favoritos** salvos localmente no navegador
- 🌍 **10 culinárias** — Italiana, Brasileira, Japonesa e muito mais
- 🔗 **Rotas dinâmicas** — `/receita/:id`, `/categoria/:id`, `/culinaria/:id`

---

## 🖼️ Prints da aplicação

> (Adicione seus prints aqui)

| Home | Detalhe | Busca |
|---|---|---|
| ![home](prints/home.png) | ![detail](prints/detail.png) | ![search](prints/search.png) |

---

## 🏗️ Arquitetura

```
src/
├── App.js                    # Rotas principais
├── index.js                  # Ponto de entrada
├── index.css                 # Estilos globais e variáveis CSS
├── services/
│   └── mealService.js        # Integração com TheMealDB API + traduções
├── components/
│   ├── Navbar.js             # Barra de navegação + culinárias fixas
│   ├── MealCard.js           # Card de receita reutilizável
│   └── SectionHeader.js      # Header de seção estilo editorial
└── pages/
    ├── Home.js               # Página inicial
    ├── Catalog.js            # Catálogo por categoria/culinária (rota dinâmica)
    ├── Detail.js             # Detalhe da receita (rota dinâmica)
    ├── Search.js             # Busca de receitas
    └── Favorites.js          # Favoritos salvos
```

**Fluxo de dados:**
```
React Pages → mealService.js → TheMealDB API
                            → Google Translate API (tradução)
                            → localStorage (favoritos)
```

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18.2 | Framework principal |
| React Router DOM | 6.22 | Rotas dinâmicas |
| TheMealDB API | v1 | Dados das receitas |
| Google Translate API | - | Tradução do modo de preparo |
| CSS Modules | - | Estilização por componente |
| localStorage | - | Persistência de favoritos |

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v16 ou superior
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/tapronto-react.git
cd tapronto-react
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o projeto

```bash
npm start
```

Acesse: **http://localhost:3000**

### 4. Build para produção

```bash
npm run build
```

---

## 🌐 Deploy

A aplicação está hospedada na Vercel:

🔗 **[link-do-deploy-aqui]**

> Para fazer deploy na Vercel:
> ```bash
> npm install -g vercel
> vercel
> ```

---

## 📡 API utilizada

**[TheMealDB](https://www.themealdb.com/api.php)**

- Base URL: `https://www.themealdb.com/api/json/v1/1`
- Gratuita, sem autenticação
- Endpoints usados:
  - `search.php?s={nome}` — busca por nome
  - `filter.php?c={categoria}` — filtra por categoria
  - `filter.php?a={area}` — filtra por culinária
  - `filter.php?i={ingrediente}` — filtra por ingrediente
  - `lookup.php?i={id}` — detalhes de uma receita

---

## 👩‍💻 Autora

Desenvolvido por **Luiza Souza** — projeto individual da disciplina de Desenvolvimento Web.
