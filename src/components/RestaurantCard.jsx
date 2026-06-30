import { useNavigate } from 'react-router-dom';

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  return (
    <div style={styles.card} onClick={() => navigate(`/restaurant/${restaurant._id}`)}>
      <img src={restaurant.imageUrl} alt={restaurant.name} style={styles.img} />
      <div style={styles.info}>
        <h3 style={styles.name}>{restaurant.name}</h3>
        <p style={styles.cuisine}>{restaurant.cuisine}</p>
        <div style={styles.footer}>
          <span style={styles.address}>📍 {restaurant.address}</span>
          <span style={styles.rating}>⭐ {restaurant.rating}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { background:'#fff', borderRadius:'12px', overflow:'hidden', cursor:'pointer',
    boxShadow:'0 2px 12px rgba(0,0,0,0.1)', transition:'transform 0.2s',
    ':hover': { transform:'translateY(-4px)' } },
  img: { width:'100%', height:'180px', objectFit:'cover' },
  info: { padding:'1rem' },
  name: { margin:'0 0 4px', fontSize:'1.1rem', color:'#1a1a2e' },
  cuisine: { color:'#888', fontSize:'0.85rem', margin:'0 0 8px' },
  footer: { display:'flex', justifyContent:'space-between', alignItems:'center' },
  address: { fontSize:'0.8rem', color:'#666' },
  rating: { background:'#fff8e1', color:'#f57c00', padding:'3px 10px',
    borderRadius:'20px', fontSize:'0.85rem', fontWeight:600 }
};