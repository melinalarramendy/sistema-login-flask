import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
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

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            toast.fire({
                icon: 'error',
                title: 'Las contraseñas no coinciden'
            });
            return;
        }
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Error al cambiar la contraseña');

            toast.fire({
                icon: 'success',
                title: '¡Contraseña actualizada!'
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
                    <h2>Restablecer Contraseña</h2>
                    <p>Ingresa tu nueva contraseña</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 input-group">
                        <span className="input-group-text">
                            <FaLock />
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            placeholder="Confirmar contraseña"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
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
                        ) : 'Restablecer'}
                    </motion.button>

                    <div className="login-footer mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <a href="/login">Volver al inicio de sesión</a>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default ResetPassword;