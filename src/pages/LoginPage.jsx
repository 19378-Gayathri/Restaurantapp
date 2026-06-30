import { SignIn } from '@clerk/clerk-react'

export default function LoginPage() {
  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1 style={styles.title}>🍽 FoodieHub</h1>
        <p style={styles.sub}>Order from the best restaurants near you</p>
      </div>
      <div style={styles.right}>
        <SignIn routing="hash" afterSignInUrl="/" />
      </div>
    </div>
  )
}

const styles = {
  container: { display:'flex', minHeight:'100vh' },
  left: {
    flex:1, background:'linear-gradient(135deg,#1a1a2e,#e94560)',
    display:'flex', flexDirection:'column', justifyContent:'center',
    alignItems:'center', color:'#fff', padding:'2rem'
  },
  title: { fontSize:'3rem', margin:'0 0 1rem', fontWeight:800 },
  sub: { fontSize:'1.2rem', opacity:0.85, textAlign:'center' },
  right: {
    flex:1, display:'flex', justifyContent:'center',
    alignItems:'center', background:'#f7f8fc', padding:'2rem'
  }
}