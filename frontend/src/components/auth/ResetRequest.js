import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
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

const ResetRequest = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/auth/request-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Error al solicitar el reseteo');

            toast.fire({
                icon: 'success',
                title: 'Si el correo existe, recibirás instrucciones.'
            });
            setTimeout(() => navigate('/login'), 1800);
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
                    <h2>Recuperar Contraseña</h2>
                    <p>Ingresa tu correo para recibir instrucciones</p>
                </div>

                <form onSubmit={handleSubmit}>
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

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-gradient w-100 text-white fw-bold"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : 'Enviar'}
                    </motion.button>

                    <div className="login-footer mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <a href="/login">Volver al inicio de sesión</a>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default ResetRequest;