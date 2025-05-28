# 🔐 Login App con Flask + React

Este proyecto es una aplicación de inicio de sesión (login) con **backend en Flask** y **frontend en React**. Permite autenticación segura usando JWT y gestión de sesiones.


## 🧱 Estructura del Proyecto

- /backend ← API REST con Flask
- /frontend ← Interfaz de usuario con React

## ⚙️ Backend - Flask

El backend está desarrollado con **Flask** y provee endpoints protegidos usando **JWT (JSON Web Tokens)**. La información del usuario se puede almacenar tanto en **MongoDB** como en **SQLite/MySQL** gracias a SQLAlchemy y PyMongo.

### 📦 Dependencias

- `Flask==3.1.0`
- `flask-cors==5.0.1`
- `Flask-JWT-Extended==4.7.1`
- `PyJWT==2.10.1`
- `pymongo==4.11.3`
- `Flask-Login==0.6.3`
- `Flask-SQLAlchemy==3.1.1`


## 💻 Frontend - React

La interfaz está hecha con React 19, usando React Router, Bootstrap 5 y SweetAlert2 para un diseño moderno y responsivo.

### 📦 Dependencias

- `axios==^1.9.0`
- `bootstrap==^5.3.6`
- `framer-motion==^12.15.0`
- `react==^19.1.0`
- `react-bootstrap==^2.10.10`
- `react-dom==^19.1.0`
- `react-icons==^5.5.0`
- `react-router-dom==^7.6.1`
- `sweetalert2==^11.22.0`


## 🔐 Funcionalidades

- Registro e inicio de sesión de usuarios
- Tokens JWT para autenticación
- Middleware para rutas protegidas
- UI moderna y responsiva
- Comunicación cliente-servidor vía Axios
- Gestión de sesiones con JWT + Flask-Login


## 🛡️ Seguridad

-  Contraseñas encriptadas
-  Protección CORS configurada
-  Tokens seguros con expiración


