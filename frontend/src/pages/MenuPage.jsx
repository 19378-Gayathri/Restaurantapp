import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['Starters', 'Mains', 'Desserts'];

export default function MenuPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Starters');
  const [added, setAdded] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/restaurants/${id}`)
      .then(r => r.json())
      .then(setRestaurant);
  }, [id]);

  const handleAdd = (item) => {
    dispatch({ type: 'ADD_ITEM', item });
    setAdded(prev => ({ ...prev, [item._id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [item._id]: false })), 1500);
  };

  if (!restaurant) return <p style={{ textAlign:'center', padding:'3rem' }}>Loading menu...</p>;

  const filtered = restaurant.menu.filter(i => i.category === activeCategory);

  return (
    <div style={styles.page}>
      <div style={{ ...styles.hero, backgroundImage:`url(${restaurant.imageUrl})` }}>
        <div style={styles.heroOverlay}>
          <button style={styles.backBtn} onClick={() => navigate('/')}>← Back</button>
          <h1 style={styles.name}>{restaurant.name}</h1>
          <p style={styles.meta}>{restaurant.cuisine} · ⭐ {restaurant.rating} · {restaurant.address}</p>
        </div>
      </div>

      <div style={styles.tabs}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            style={{ ...styles.tab, ...(activeCategory === cat ? styles.activeTab : {}) }}
            onClick={() => setActiveCategory(cat)}
          >{cat}</button>
        ))}
      </div>

      <div style={styles.grid}>
        {filtered.map(item => (
          <div key={item._id} style={styles.card}>
            <img src={item.imageUrl} alt={item.itemName} style={styles.img} />
            <div style={styles.cardBody}>
              <h3 style={styles.itemName}>{item.itemName}</h3>
              <p style={styles.desc}>{item.description}</p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>₹{item.price}</span>
                <button
                  style={{ ...styles.addBtn, background: added[item._id] ? '#4caf50' : '#e94560' }}
                  onClick={() => handleAdd(item)}
                >
                  {added[item._id] ? '✓ Added' : '+ Add'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight:'100vh', background:'#f7f8fc' },
  hero: { height:'260px', backgroundSize:'cover', backgroundPosition:'center', position:'relative' },
  heroOverlay: { position:'absolute', inset:0, background:'rgba(0,0,0,0.55)',
    display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'1.5rem 2rem' },
  backBtn: { position:'absolute', top:'1rem', left:'1rem', background:'rgba(255,255,255,0.2)',
    color:'#fff', border:'none', padding:'0.5rem 1rem', borderRadius:'20px', cursor:'pointer' },
  name: { color:'#fff', fontSize:'2rem', margin:'0 0 0.3rem', fontWeight:800 },
  meta: { color:'#ddd', fontSize:'0.95rem', margin:0 },
  tabs: { display:'flex', gap:'0.5rem', padding:'1.5rem 2rem 0',
    maxWidth:'1100px', margin:'0 auto' },
  tab: { padding:'0.6rem 1.5rem', borderRadius:'25px', border:'2px solid #ddd',
    background:'#fff', cursor:'pointer', fontWeight:600, color:'#666', transition:'all 0.2s' },
  activeTab: { background:'#e94560', color:'#fff', borderColor:'#e94560' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))',
    gap:'1.25rem', padding:'1.5rem 2rem 3rem', maxWidth:'1100px', margin:'0 auto' },
  card: { background:'#fff', borderRadius:'12px', overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,0.08)' },
  img: { width:'100%', height:'160px', objectFit:'cover' },
  cardBody: { padding:'1rem' },
  itemName: { margin:'0 0 4px', fontSize:'1rem', color:'#1a1a2e' },
  desc: { color:'#888', fontSize:'0.83rem', margin:'0 0 0.75rem', lineHeight:'1.4' },
  cardFooter: { display:'flex', justifyContent:'space-between', alignItems:'center' },
  price: { fontWeight:700, color:'#e94560', fontSize:'1.05rem' },
  addBtn: { color:'#fff', border:'none', padding:'0.45rem 1.1rem',
    borderRadius:'20px', cursor:'pointer', fontWeight:600, transition:'background 0.3s' }
};