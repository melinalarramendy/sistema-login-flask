import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Error en el registro');

            toast.fire({
                icon: 'success',
                title: '¡Registro exitoso! Ahora puedes iniciar sesión.'
            });
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            toast.fire({
                icon: 'error',
                title: err.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="login-container"
        >
            <div className="login-card">
                <div className="login-header">
                    <h2>Registrarse</h2>
                    <p>Crea tu cuenta</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <FaUser />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <FaEnvelope />
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <FaLock />
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="alert alert-success">
                            {success}
                        </div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-gradient w-100 text-white fw-bold"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : 'Registrarse'}
                    </motion.button>

                    <div className="login-footer mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default Register;