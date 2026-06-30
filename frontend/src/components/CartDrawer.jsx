import { useCart } from '../context/CartContext';
import { useAuth } from '@clerk/clerk-react'
export default function CartDrawer({ onClose }) {
  const { cart, dispatch, total } = useCart();
  const { userId } = useAuth()

  const handleClear = () => {
    dispatch({ type: 'CLEAR' })
    fetch(`${import.meta.env.VITE_API_URL}/api/cart/${userId}`, { method: 'DELETE' })
  }
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.drawer} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={{ margin:0 }}>Your Cart</h2>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <p style={{ textAlign:'center', color:'#888', marginTop:'2rem' }}>
            Your cart is empty
          </p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.itemId}
               style={styles.item}>
                <img src={item.imageUrl} alt={item.itemName} style={styles.itemImg} />
                <div style={{ flex:1 }}>
                  <p style={styles.itemName}>{item.itemName}</p>
                  <p style={styles.itemPrice}>₹{item.price}</p>
                </div>
                <div style={styles.controls}>
                  <button style={styles.qtyBtn}
                    onClick={() => dispatch({ type:'DECREMENT', id: item.itemId })}>−</button>
                  <span style={styles.qty}>{item.quantity}</span>
                  <button style={styles.qtyBtn}
                    onClick={() => dispatch({ type:'INCREMENT', id: item.itemId })}>+</button>
                  <button style={styles.removeBtn}
                    onClick={() => dispatch({ type:'REMOVE', id:  item.itemId })}>🗑</button>
                </div>
              </div>
            ))}

            <div style={styles.footer}>
              <div style={styles.total}>Total: <strong>₹{total}</strong></div>
              <div style={{ display:'flex', gap:'0.5rem' }}>
              <button style={styles.clearBtn} onClick={handleClear}>Clear All</button>
                <button style={styles.checkoutBtn}>Checkout</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: { position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:200 },
  drawer: { position:'absolute', right:0, top:0, bottom:0, width:'380px',
    background:'#fff', padding:'1.5rem', overflowY:'auto', display:'flex', flexDirection:'column' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' },
  closeBtn: { background:'none', border:'none', fontSize:'1.3rem', cursor:'pointer' },
  item: { display:'flex', alignItems:'center', gap:'0.75rem',
    padding:'0.75rem 0', borderBottom:'1px solid #f0f0f0' },
  itemImg: { width:'55px', height:'55px', borderRadius:'8px', objectFit:'cover' },
  itemName: { margin:0, fontWeight:600, fontSize:'0.95rem' },
  itemPrice: { margin:'4px 0 0', color:'#e94560', fontWeight:600 },
  controls: { display:'flex', alignItems:'center', gap:'6px' },
  qtyBtn: { width:'28px', height:'28px', borderRadius:'50%', border:'1px solid #ddd',
    background:'#f5f5f5', cursor:'pointer', fontWeight:700 },
  qty: { minWidth:'20px', textAlign:'center', fontWeight:600 },
  removeBtn: { background:'none', border:'none', cursor:'pointer', fontSize:'1rem' },
  footer: { marginTop:'auto', paddingTop:'1rem', borderTop:'2px solid #f0f0f0' },
  total: { fontSize:'1.1rem', marginBottom:'0.75rem' },
  clearBtn: { flex:1, padding:'0.6rem', background:'#f5f5f5', border:'1px solid #ddd',
    borderRadius:'8px', cursor:'pointer' },
  checkoutBtn: { flex:1, padding:'0.6rem', background:'#e94560', color:'#fff',
    border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:600 }
};