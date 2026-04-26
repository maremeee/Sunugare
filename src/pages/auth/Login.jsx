import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      const { token, user } = response.data;

      // Sauvegarder le token et le rôle
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      // Redirection selon le rôle
      if (user.role === 'admin') navigate('/dashboard');
      else if (user.role === 'regulateur') navigate('/scan');
      else if (user.role === 'chauffeur') navigate('/ma-file');
      else navigate('/destinations');

    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo / Titre */}
        <h1 style={styles.title}>🚌 SunuGare</h1>
        <p style={styles.subtitle}>Connectez-vous à votre compte</p>

        {/* Message erreur */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Formulaire */}
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={styles.input}
            />
          </div>
    
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </div>

        <p style={styles.registerText}>
          Pas encore de compte ?{' '}
          <span
            onClick={() => navigate('/register')}
            style={styles.link}
          >
            S'inscrire
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    color: '#1a56db',
    fontSize: '28px',
    marginBottom: '8px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '24px',
  },

error: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    color: '#374151',
    fontWeight: '600',
    fontSize: '14px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    backgroundColor: '#1a56db',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
  registerText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#6b7280',
    fontSize: '14px',
  },
  link: {
    color: '#1a56db',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Login;
