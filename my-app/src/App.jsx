import { useState, useEffect } from 'react';
import './index.scss';

import a1 from './assets/img/light_btn.png';
import a2 from './assets/img/dark_btn.png';
import a3 from './assets/img/icon_btn.png';
import a4 from './assets/img/icons8-search.svg';

const DATA = [
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

const LIMIT = 6;

function App() {
  const [t, setT] = useState(true);
  const [q, setQ] = useState('');
  const [r, setR] = useState([]);
  const [p, setP] = useState(1);

  const [s, setS] = useState(false);
  const [art, setArt] = useState('');
  const [mus, setMus] = useState('');
  const [y1, setY1] = useState('');
  const [y2, setY2] = useState('');
  const [acc, setAcc] = useState({ a: false, m: false, y: false });

  const artists = [...new Set(DATA.map(e => e.artist))].sort();
  const museums = [...new Set(DATA.map(e => e.museum))].sort();

  useEffect(() => {
    const filtered = DATA.filter(item => {
      const matchQ = item.title.toLowerCase().includes(q.toLowerCase());
      const matchArt = art ? item.artist === art : true;
      const matchMus = mus ? item.museum === mus : true;
      const matchY1 = y1 ? item.year >= parseInt(y1) : true;
      const matchY2 = y2 ? item.year <= parseInt(y2) : true;
      return matchQ && matchArt && matchMus && matchY1 && matchY2;
    });
    setR(filtered);
    setP(1);
  }, [q, art, mus, y1, y2]);

  const handleTheme = () => {
    setT(!t);
    document.documentElement.classList.toggle('light-theme');
  };

  const toggleAcc = (key) => {
    setAcc(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAll = () => {
    setArt('');
    setMus('');
    setY1('');
    setY2('');
    setQ('');
  };

  const total = Math.ceil(r.length / LIMIT);
  const last = p * LIMIT;
  const first = last - LIMIT;
  const current = r.slice(first, last);

  return (
    <div className={`app ${t ? '' : 'light-theme'}`}>
      <header className="header">
        <div className="container-1440">
          <div className="header-content">
            <button className="theme-btn" onClick={handleTheme}>
              <img src={t ? a1 : a2} alt="Toggle Theme" />
            </button>

            <div className="search-row">
              <div className="search-input-wrapper">
                <img src={a4} className="search-icon" alt="Search icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Painting title"
                  value={q}
                  onChange={e => setQ(e.target.value)}
                />
              </div>

              <button className="filter-btn" onClick={() => setS(true)}>
                <img src={a3} alt="Open Filter" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container-1440">
          <div className="gallery-grid" id="gallery">
            {current.length > 0 ? (
              current.map(item => (
                <div key={item.id} className="card">
                  <div className="card-img-wrapper">
                    <img src={item.img} className="card-img" alt={item.title} />
                  </div>
                  <div className="card-bottom">
                    <div className="gold-line"></div>
                    <div className="card-text">
                      <div className="card-title">{item.title}</div>
                      <div className="card-date">{item.year}</div>
                    </div>
                    <div className="card-arrow">
                      <span className="arrow-icon">›</span>
                    </div>
                  </div>
                  <div className="hover-info">
                    <div className="hover-artist">{item.artist}</div>
                    <div className="hover-museum">{item.museum}</div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.5, paddingTop: '40px' }}>
                No items match your criteria
              </div>
            )}
          </div>

          {total > 1 && (
            <div className="pagination-wrapper">
              <div className="pagination">
                <button
                  className="pagination-arrow"
                  onClick={() => setP(prev => Math.max(prev - 1, 1))}
                  disabled={p === 1}
                >
                  ‹
                </button>
                {Array.from({ length: total }, (_, i) => {
                  const num = i + 1;
                  return (
                    <button
                      key={num}
                      className={`pagination-btn ${p === num ? 'active' : ''}`}
                      onClick={() => setP(num)}
                    >
                      {num}
                    </button>
                  );
                })}
                <button
                  className="pagination-arrow"
                  onClick={() => setP(prev => Math.min(prev + 1, total))}
                  disabled={p === total}
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <div
        className={`filter-overlay ${s ? 'active' : ''}`}
        onClick={() => setS(false)}
      ></div>

      <div className={`filter-sidebar ${s ? 'open' : ''}`}>
        <button className="close-filter-btn" onClick={() => setS(false)}>×</button>
        <div className="filter-sidebar-content">
          <div className={`accordion-item ${acc.a ? 'active' : ''}`}>
            <div className="accordion-header" onClick={() => toggleAcc('a')}>
              <span>Artist</span>
              <span className="accordion-icon">{acc.a ? '−' : '+'}</span>
            </div>
            <div className="accordion-body">
              <select className="sidebar-select" value={art} onChange={e => setArt(e.target.value)}>
                <option value="">All Artists</option>
                {artists.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          <div className={`accordion-item ${acc.m ? 'active' : ''}`}>
            <div className="accordion-header" onClick={() => toggleAcc('m')}>
              <span>Museum</span>
              <span className="accordion-icon">{acc.m ? '−' : '+'}</span>
            </div>
            <div className="accordion-body">
              <select className="sidebar-select" value={mus} onChange={e => setMus(e.target.value)}>
                <option value="">All Museums</option>
                {museums.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className={`accordion-item ${acc.y ? 'active' : ''}`}>
            <div className="accordion-header" onClick={() => toggleAcc('y')}>
              <span>Years</span>
              <span className="accordion-icon">{acc.y ? '−' : '+'}</span>
            </div>
            <div className="accordion-body">
              <div className="sidebar-years-range">
                <input type="number" className="sidebar-input" placeholder="From" value={y1} onChange={e => setY1(e.target.value)} />
                <span className="dash">—</span>
                <input type="number" className="sidebar-input" placeholder="To" value={y2} onChange={e => setY2(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-actions">
          <button className="sidebar-show-btn" onClick={() => setS(false)}>
            Show items ({r.length})
          </button>
          <button className="sidebar-clear-btn" onClick={clearAll}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;