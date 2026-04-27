import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Rotas dinâmicas */}
        <Route path="/receita/:id" element={<Detail />} />
        <Route path="/categoria/:id" element={<Catalog type="category" />} />
        <Route path="/culinaria/:id" element={<Catalog type="area" />} />

        {/* Busca e favoritos */}
        <Route path="/buscar" element={<Search />} />
        <Route path="/favoritos" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}
