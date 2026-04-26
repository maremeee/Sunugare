import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function Destinations() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/destinations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDestinations(response.data);
    } catch (err) {
      // Données fictives en attendant le backend
      setDestinations([
        { id: 1, ville: 'Thiès', prix: 2500, duree: '1h30', vehicules: 5 },
        { id: 2, ville: 'Saint-Louis', prix: 5000, duree: '4h00', vehicules: 3 },
        { id: 3, ville: 'Ziguinchor', prix: 8000, duree: '8h00', vehicules: 2 },
        { id: 4, ville: 'Touba', prix: 3500, duree: '3h00', vehicules: 6 },
        { id: 5, ville: 'Kaolack', prix: 3000, duree: '2h30', vehicules: 4 },
        { id: 6, ville: 'Tambacounda', prix: 6000, duree: '6h00', vehicules: 2 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const destinationsFiltrees = destinations.filter(d =>
    d.ville.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🚌 SunuGare</h2>
        <div style={styles.navRight}>
          <span style={styles.welcome}>Bonjour, {user?.nom || 'Passager'}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div style={styles.content}>
        <h1 style={styles.title}>Destinations disponibles</h1>

        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="🔍 Rechercher une ville..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          style={styles.searchBar}
        />

        {/* Liste des destinations */}
        {loading ? (
          <p style={styles.loading}>Chargement...</p>
        ) : (
          <div style={styles.grid}>
            {destinationsFiltrees.map((dest) => (
              <div key={dest.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.ville}>📍 {dest.ville}</h3>
                  <span style={styles.prix}>{dest.prix} FCFA</span>
                </div>
                <div style={styles.cardInfo}>
                  <span>⏱ {dest.duree}</span>
                  <span>🚐 {dest.vehicules} véhicules</span>
                </div>
                <button
                  onClick={() => navigate('/reservation', {
                    state: { destination: dest }
                  })}
                  style={styles.btn}
                >
                  Réserver
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
  },
  navbar: {
    backgroundColor: '#1a56db',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    margin: 0,
    fontSize: '22px',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  welcome: {
    color: 'white',
    fontSize: '14px',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  content: {
    padding: '32px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  title: {
    color: '#1e3a5f',
    marginBottom: '20px',
  },
  searchBar: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    marginBottom: '24px',
    boxSizing: 'border-box',
  },
  loading: {
    textAlign: 'center',
    color: '#6b7280',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  ville: {
    margin: 0,
    color: '#1e3a5f',
    fontSize: '18px',
  },
  prix: {
    backgroundColor: '#dbeafe',
    color: '#1a56db',
    padding: '4px 10px',
    borderRadius: '20px',
    fontWeight: '700',
    fontSize: '14px',
  },
  cardInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '16px',
  },
  btn: {
    width: '100%',
    backgroundColor: '#1a56db',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px',
  },
};

export default Destinations;
