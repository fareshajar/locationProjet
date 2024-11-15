import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import Image2 from './assets/images/Image2.png'; // Chemin correct pour l'image
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import des icônes

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        try {
            console.log("Sending POST request...");
            const response = await fetch('http://localhost:8083/Admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            console.log("POST request sent");

            if (response.ok) {
                const user = await response.json();
                console.log('Login successful', user);

                // Vérifier le type d'utilisateur et rediriger en conséquence
                if (user.typeUtilisateur === 'Administrateur') {
                    navigate('/Planing');
                } else if (user.typeUtilisateur === 'locateur') {
                    navigate('/PlaningLocateur', { state: { userId: user.id } });
                } else {
                    alert('Type d’utilisateur non reconnu');
                }
            } else {
                const errorResponse = await response.json();
                console.error('Error logging in:', errorResponse);
                alert(errorResponse.message || 'Erreur de connexion');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Erreur de connexion');
        }
    };

    return (
        <div className="login-container">
            <div className="left-section">
                <h3>Welcome</h3>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">
                            <FaUser style={{ color: '#007bff' }} aria-hidden="true" /> {/* Icône utilisateur */}
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">
                            <FaLock style={{color: '#007bff'}} aria-hidden="true"/> {/* Icône mot de passe */}
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash aria-hidden="true"/> : <FaEye style={{color: '#007bff'}} aria-hidden="true"/>}
                            </span>
                        </label>
                    </div>

                    <button>Connexion</button>
                </form>
            </div>
            <div className="right-section">
                <img src={Image2} alt="Login background" className="background-image" />
            </div>
        </div>
    );
};

export default LoginForm;
