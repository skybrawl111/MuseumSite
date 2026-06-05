import { useState, useEffect } from 'react';
import './index.scss';

import lightBtn from './assets/img/light_btn.png';
import darkBtn from './assets/img/dark_btn.png';
import filterIcon from './assets/img/icon_btn.png';
import searchIcon from './assets/img/icons8-search.svg'; // Импорт вашей SVG-лупы

// Массив расширен ровно до 20 карточек
const PAINTINGS_DATA = [
  { id: 1, title: "CASCATE DI TIVOLI", year: 1761, artist: "JEAN-HONORE FRAGONARD", museum: "LOUVRE MUSEUM", img: "./src/assets/img/cascateditivoli.jpg" },
  { id: 2, title: "PORTRAIT OF VINCENT VAN GOGH", year: 1886, artist: "VINCENT VAN GOGH", museum: "MUSEUM OF MODERN ART", img: "./src/assets/img/PortraitofVincentvanGogh.png" },
  { id: 3, title: "UNEQUAL MARRIAGE", year: 1862, artist: "JEAN-HONORE FRAGONARD", museum: "LOUVRE MUSEUM", img: "./src/assets/img/Unequalmarriage.png" },
  { id: 4, title: "THE HAPPY VIOLINIST", year: 1624, artist: "THOMAS GAINSBOROUGH", museum: "NATIONAL GALLERY", img: "./src/assets/img/ThehappyViolinist.png" },
  { id: 5, title: "THE ARCADIAN", year: 1834, artist: "THOMAS GAINSBOROUGH", museum: "NATIONAL GALLERY", img: "./src/assets/img/TheArcadian.jpg" },
  { id: 6, title: "GOLFO DI NAPOLI", year: 1845, artist: "THOMAS GAINSBOROUGH", museum: "NATIONAL GALLERY", img: "./src/assets/img/GolfodiNapoli.jpg" },
  { id: 8, title: "MONA LISA", year: 1503, artist: "LEONARDO DA VINCI", museum: "LOUVRE MUSEUM", img: "./src/assets/img/Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg.webp" },
  { id: 9, title: "GUERNICA", year: 1937, artist: "PABLO PICASSO", museum: "MUSEUM OF MODERN ART", img: "./src/assets/img/71Ion8xjswL._AC_UF1000,1000_QL80_.jpg" },
  { id: 10, title: "THE KISS", year: 1907, artist: "GUSTAV KLIMT", museum: "BELVEDERE MUSEUM", img: "./src/assets/img/KL1267-1000x1000.jpg" },
  { id: 11, title: "THE STARRY NIGHT", year: 1889, artist: "VINCENT VAN GOGH", museum: "MUSEUM OF MODERN ART", img: "./src/assets/img/The-Starry-Night-1200x630-1-979x514.jpg.webp" },
  { id: 12, title: "LAS MENINAS", year: 1656, artist: "DIEGO VELAZQUEZ", museum: "PRADO MUSEUM", img: "./src/assets/img/Las_Meninas_(1656),_by_Velazquez.jpg" },
  { id: 13, title: "THE SCREAM", year: 1893, artist: "EDVARD MUNCH", museum: "NATIONAL GALLERY", img: "./src/assets/img/1920px-The_Scream.jpg" },
  { id: 14, title: "THE NIGHT WATCH", year: 1642, artist: "REMBRANDT", museum: "RIJKSMUSEUM", img: "./src/assets/img/La_ronda_de_noche,_por_Rembrandt_van_Rijn.jpg" },
  { id: 15, title: "LIBERTY LEADING THE PEOPLE", year: 1830, artist: "EUGENE DELACROIX", museum: "LOUVRE MUSEUM", img: "./src/assets/img/La_Liberté_guidant_le_peuple_-_Eugène_Delacroix_-_Musée_du_Louvre_Peintures_RF_129_-_après_restauration_2024.jpg" },
  { id: 16, title: "THE PERSISTENCE OF MEMORY", year: 1931, artist: "SALVADOR DALI", museum: "MUSEUM OF MODERN ART", img: "./src/assets/img/The-Persistence-of-Memory-canvas-collection-Salvador-1931.webp" },
  { id: 17, title: "WANDERER ABOVE THE SEA OF FOG", year: 1818, artist: "CASPAR DAVID FRIEDRICH", museum: "KUNSTHALLE HAMBURG", img: "./src/assets/img/wandrear.jpg" },
  { id: 18, title: "GIRL WITH A PEARL EARRING", year: 1665, artist: "JOHANNES VERMEER", museum: "MAURITSHUIS", img: "./src/assets/img/images.jpg" },
  { id: 19, title: "IMPRESSION, SUNRISE", year: 1872, artist: "CLAUDE MONET", museum: "MUSEЕ MARMOTTAN MONET", img: "./src/assets/img/Monet_-_Impression,_Sunrise.jpg" },
  { id: 20, title: "SPRINGTIME", year: 1873, artist: "PIERRE-AUGUSTE COT", museum: "METROPOLITAN MUSEUM", img: "./src/assets/img/PIERRE-AUGUSTE_COT_-_Primavera_(Museo_Metropolitano_de_Nueva_York,_1873._Óleo_sobre_lienzo,_213.4_x_127_cm).jpg" },
];

const ITEMS_PER_PAGE = 6;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPaintings, setFilteredPaintings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedMuseum, setSelectedMuseum] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [accordionOpen, setAccordionOpen] = useState({
    artist: false,
    museum: false,
    years: false
  });

  const uniqueArtists = [...new Set(PAINTINGS_DATA.map(p => p.artist))].sort();
  const uniqueMuseums = [...new Set(PAINTINGS_DATA.map(p => p.museum))].sort();

  useEffect(() => {
    const filtered = PAINTINGS_DATA.filter(painting => {
      const matchesSearch = painting.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArtist = selectedArtist ? painting.artist === selectedArtist : true;
      const matchesMuseum = selectedMuseum ? painting.museum === selectedMuseum : true;
      const matchesStartYear = startYear ? painting.year >= parseInt(startYear) : true;
      const matchesEndYear = endYear ? painting.year <= parseInt(endYear) : true;

      return matchesSearch && matchesArtist && matchesMuseum && matchesStartYear && matchesEndYear;
    });

    setFilteredPaintings(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedArtist, selectedMuseum, startYear, endYear]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('light-theme');
  };

  const toggleAccordion = (section) => {
    setAccordionOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const clearFilters = () => {
    setSelectedArtist('');
    setSelectedMuseum('');
    setStartYear('');
    setEndYear('');
    setSearchTerm('');
  };

  const totalPages = Math.ceil(filteredPaintings.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPaintings = filteredPaintings.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={`app ${isDarkTheme ? '' : 'light-theme'}`}>
      {/* HEADER */}
      <header className="header">
        <div className="container-1440">
          <div className="header-content">
            <button className="theme-btn" onClick={toggleTheme}>
              <img src={isDarkTheme ? lightBtn : darkBtn} alt="Toggle Theme" />
            </button>

            <div className="search-row">
              <div className="search-input-wrapper">
                {/* Вместо текстового эмодзи теперь рендерится ваша SVG-лупа */}
                <img src={searchIcon} className="search-icon" alt="Search icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Painting title"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button className="filter-btn" onClick={() => setIsSidebarOpen(true)}>
                <img src={filterIcon} alt="Open Filter" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* GALLERY */}
      <main className="main-content">
        <div className="container-1440">
          <div className="gallery-grid" id="gallery">
            {currentPaintings.length > 0 ? (
              currentPaintings.map(painting => (
                <div key={painting.id} className="card">
                  <div className="card-img-wrapper">
                    <img src={painting.img} className="card-img" alt={painting.title} />
                  </div>
                  
                  <div className="card-bottom">
                    <div className="gold-line"></div>
                    <div className="card-text">
                      <div className="card-title">{painting.title}</div>
                      <div className="card-date">{painting.year}</div>
                    </div>
                    <div className="card-arrow">
                      <span className="arrow-icon">›</span>
                    </div>
                  </div>

                  <div className="hover-info">
                    <div className="hover-artist">{painting.artist}</div>
                    <div className="hover-museum">{painting.museum}</div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.5, paddingTop: '40px' }}>
                No items match your criteria
              </div>
            )}
          </div>

          {/* ПАГИНАЦИЯ */}
          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <div className="pagination">
                <button 
                  className="pagination-arrow" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button 
                  className="pagination-arrow" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ФИЛЬТР САЙДБАР */}
      <div 
        className={`filter-overlay ${isSidebarOpen ? 'active' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      
      <div className={`filter-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-filter-btn" onClick={() => setIsSidebarOpen(false)}>×</button>
        
        <div className="filter-sidebar-content">
          <div className={`accordion-item ${accordionOpen.artist ? 'active' : ''}`}>
            <div className="accordion-header" onClick={() => toggleAccordion('artist')}>
              <span>Artist</span>
              <span className="accordion-icon">{accordionOpen.artist ? '−' : '+'}</span>
            </div>
            <div className="accordion-body">
              <select 
                className="sidebar-select" 
                value={selectedArtist}
                onChange={(e) => setSelectedArtist(e.target.value)}
              >
                <option value="">All Artists</option>
                {uniqueArtists.map(artist => (
                  <option key={artist} value={artist}>{artist}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={`accordion-item ${accordionOpen.museum ? 'active' : ''}`}>
            <div className="accordion-header" onClick={() => toggleAccordion('museum')}>
              <span>Museum</span>
              <span className="accordion-icon">{accordionOpen.museum ? '−' : '+'}</span>
            </div>
            <div className="accordion-body">
              <select 
                className="sidebar-select" 
                value={selectedMuseum}
                onChange={(e) => setSelectedMuseum(e.target.value)}
              >
                <option value="">All Museums</option>
                {uniqueMuseums.map(museum => (
                  <option key={museum} value={museum}>{museum}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={`accordion-item ${accordionOpen.years ? 'active' : ''}`}>
            <div className="accordion-header" onClick={() => toggleAccordion('years')}>
              <span>Years</span>
              <span className="accordion-icon">{accordionOpen.years ? '−' : '+'}</span>
            </div>
            <div className="accordion-body">
              <div className="sidebar-years-range">
                <input 
                  type="number" 
                  className="sidebar-input" 
                  placeholder="From" 
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                />
                <span className="dash">—</span>
                <input 
                  type="number" 
                  className="sidebar-input" 
                  placeholder="To" 
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-actions">
          <button className="sidebar-show-btn" onClick={() => setIsSidebarOpen(false)}>
            Show items ({filteredPaintings.length})
          </button>
          <button className="sidebar-clear-btn" onClick={clearFilters}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;