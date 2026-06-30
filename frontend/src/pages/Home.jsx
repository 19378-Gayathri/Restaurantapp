import { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (minRating > 0) params.append('minRating', minRating);

    fetch(`${import.meta.env.VITE_API_URL}/api/restaurants?${params}`)
      .then(r => r.json())
      .then(data => { setRestaurants(data); setLoading(false); });
  }, [search, minRating]);

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find Your Perfect Meal</h1>
        <p style={styles.heroSub}>Explore the best restaurants near you</p>
      </div>

      <div style={styles.filters}>
        <input
          style={styles.searchInput}
          placeholder="🔍  Search restaurants..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={styles.select}
          value={minRating}
          onChange={e => setMinRating(e.target.value)}
        >
          <option value={0}>All Ratings</option>
          <option value={3}>⭐ 3+</option>
          <option value={4}>⭐ 4+</option>
          <option value={4.5}>⭐ 4.5+</option>
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign:'center', padding:'3rem', color:'#888' }}>Loading...</p>
      ) : restaurants.length === 0 ? (
        <p style={{ textAlign:'center', padding:'3rem', color:'#888' }}>No restaurants found.</p>
      ) : (
        <div style={styles.grid}>
          {restaurants.map(r => <RestaurantCard key={r._id} restaurant={r} />)}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { minHeight:'100vh', background:'#f7f8fc' },
  hero: { background:'linear-gradient(135deg,#1a1a2e,#16213e)',
    color:'#fff', padding:'4rem 2rem', textAlign:'center' },
  heroTitle: { fontSize:'2.5rem', margin:'0 0 0.5rem', fontWeight:800 },
  heroSub: { fontSize:'1.1rem', color:'#aaa', margin:0 },
  filters: { display:'flex', gap:'1rem', padding:'1.5rem 2rem',
    maxWidth:'900px', margin:'0 auto' },
  searchInput: { flex:1, padding:'0.75rem 1rem', borderRadius:'10px',
    border:'1px solid #ddd', fontSize:'1rem', outline:'none' },
  select: { padding:'0.75rem 1rem', borderRadius:'10px',
    border:'1px solid #ddd', fontSize:'1rem', background:'#fff', cursor:'pointer' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))',
    gap:'1.5rem', padding:'0 2rem 3rem', maxWidth:'1200px', margin:'0 auto' }
};