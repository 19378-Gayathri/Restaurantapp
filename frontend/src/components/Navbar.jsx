import { useState } from 'react'
import { useAuth, UserButton } from '@clerk/clerk-react'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const { itemCount } = useCart()
  const { isSignedIn } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav style={styles.nav}>
        <span style={styles.logo}>🍽 FoodieHub</span>
        <div style={styles.right}>
          {isSignedIn && (
            <button style={styles.cartBtn} onClick={() => setOpen(true)}>
              🛒 Cart
              {itemCount > 0 && <span style={styles.badge}>{itemCount}</span>}
            </button>
          )}
          {/* Clerk's built-in avatar + sign out dropdown */}
          <UserButton afterSignOutUrl="/login" />
        </div>
      </nav>
      {open && <CartDrawer onClose={() => setOpen(false)} />}
    </>
  )
}

const styles = {
  nav: {
    display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'1rem 2rem', background:'#1a1a2e', color:'#fff',
    position:'sticky', top:0, zIndex:100
  },
  logo: { fontSize:'1.4rem', fontWeight:700, letterSpacing:'1px' },
  right: { display:'flex', alignItems:'center', gap:'1rem' },
  cartBtn: {
    background:'#e94560', color:'#fff', border:'none',
    padding:'0.5rem 1.2rem', borderRadius:'25px', cursor:'pointer',
    fontSize:'1rem', position:'relative'
  },
  badge: {
    background:'#fff', color:'#e94560', borderRadius:'50%',
    padding:'2px 7px', fontSize:'0.75rem', marginLeft:'6px', fontWeight:700
  }
}