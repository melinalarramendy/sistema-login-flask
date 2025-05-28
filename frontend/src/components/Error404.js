import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button } from 'react-bootstrap';
import { FaExclamationTriangle, FaHome, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
    const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Card style={{
          width: '100%',
          maxWidth: '500px',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          border: 'none'
        }}>
          <Card.Body className="text-center p-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'mirror'
              }}
            >
              <FaExclamationTriangle 
                size={80} 
                color="#ff6b6b" 
                style={{ marginBottom: '20px' }} 
              />
            </motion.div>
            
            <h2 style={{ 
              color: '#333',
              fontWeight: '700',
              marginBottom: '10px'
            }}>
              Página no encontrada
            </h2>
            
            <p style={{ 
              color: '#6c757d',
              marginBottom: '30px'
            }}>
              La página que estás buscando no existe o ha sido movida.
            </p>
            
            <div className="d-flex gap-3 justify-content-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="primary"
                  onClick={() => navigate('/')}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    padding: '10px 20px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FaHome /> Inicio
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline-primary"
                  onClick={() => navigate(-1)}
                  style={{
                    padding: '10px 20px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FaSearch /> Volver atrás
                </Button>
              </motion.div>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default Error404;