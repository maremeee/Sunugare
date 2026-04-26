import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Reservation() {
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.destination;

  const [formData, setFormData] = useState({
    telephone_mobile_money: '',
    mode_paiement: 'mobile_money',
    nombre_places: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/reservations',
        {
          destination_id: destination.id,
          ...formData,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/mon-ticket', { state: { billet: response.data } });
    } catch (err) {
      setError('Erreur lors de la réservation. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  if (!destination) {
    navigate('/destinations');
    return null;
  }

  const total = destination.prix * formData.nombre_places;

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🚌 SunuGare</h2>
        <button onClick={() => navigate('/destinations')} style={styles.backBtn}>
          ← Retour
        </button>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>Réserver un billet</h1>

        {/* Récapitulatif destination */}
        <div style={styles.recap}>
          <h3 style={styles.recapTitle}>📍 Récapitulatif</h3>
          <div style={styles.recapGrid}>
            <div style={styles.recapItem}>
              <span style={styles.recapLabel}>Destination</span>
              <span style={styles.recapValue}>{destination.ville}</span>
            </div>
            <div style={styles.recapItem}>
              <span style={styles.recapLabel}>Prix / place</span>
              <span style={styles.recapValue}>{destination.prix} FCFA</span>
            </div>
            <div style={styles.recapItem}>
              <span style={styles.recapLabel}>Durée</span>
              <span style={styles.recapValue}>{destination.duree}</span>
            </div>
            <div style={styles.recapItem}>
              <span style={styles.recapLabel}>Total</span>
              <span style={styles.recapTotal}>{total} FCFA</span>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div style={styles.card}>
          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre de places</label>
            <select
              name="nombre_places"
              value={formData.nombre_places}
              onChange={handleChange}
              style={styles.input}
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} place{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mode de paiement</label>
            <select
              name="mode_paiement"
              value={formData.mode_paiement}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="mobile_money">📱 Mobile Money</option>
              <option value="especes">💵 Espèces (via agent)</option>
            </select>
          </div>

          {formData.mode_paiement === 'mobile_money' && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Numéro Mobile Money</label>
              <input
                type="tel"
                name="telephone_mobile_money"
                value={formData.telephone_mobile_money}
                onChange={handleChange}
                placeholder="77 000 00 00"
                style={styles.input}
              />
              <div style={styles.mobileMoney}>
                <span style={styles.mmOption}>🟠 Orange Money</span>
                <span style={styles.mmOption}>🔵 Wave</span>
              </div>
            </div>
          )}

          {formData.mode_paiement === 'especes' && (
            <div style={styles.infoBox}>
              💡 Vous recevrez un code de réservation à présenter chez un agent partenaire sous 30 minutes.
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Traitement...' : `Confirmer — ${total} FCFA`}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f4f8' },
  navbar: {
    backgroundColor: '#1a56db',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { color: 'white', margin: 0, fontSize: '22px' },
  backBtn: {
    backgroundColor: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  content: { padding: '32px', maxWidth: '600px', margin: '0 auto' },
  title: { color: '#1e3a5f', marginBottom: '24px' },
  recap: {
    backgroundColor: '#dbeafe',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
  },
  recapTitle: { color: '#1a56db', marginBottom: '16px', marginTop: 0 },
  recapGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  recapItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
  recapLabel: { color: '#6b7280', fontSize: '13px' },
  recapValue: { color: '#1e3a5f', fontWeight: '600', fontSize: '15px' },
  recapTotal: { color: '#1a56db', fontWeight: '700', fontSize: '18px' },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  inputGroup: { marginBottom: '16px' },
  label: { display: 'block', color: '#374151', fontWeight: '600', fontSize: '14px', marginBottom: '6px' },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  mobileMoney: { display: 'flex', gap: '12px', marginTop: '8px' },
  mmOption: {
    backgroundColor: '#f3f4f6',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
  },
  infoBox: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '16px',
  },
  button: {
    width: '100%',
    backgroundColor: '#1a56db',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '16px',
    marginTop: '8px',
  },
};

export default Reservation;
