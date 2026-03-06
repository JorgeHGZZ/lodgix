# Lodgix – Sistema de Gestión Hotelera

## Descripción

**Lodgix** es una aplicación web para la gestión de hoteles que permite administrar clientes, habitaciones, reservas y pagos desde una única plataforma.

El sistema está desarrollado utilizando el stack **MERN (MongoDB, Express, React, Node.js)**, implementando una arquitectura desacoplada basada en **API REST**, autenticación mediante **JWT**, y un modelo de datos gestionado con **Mongoose**.

El objetivo del sistema es centralizar las operaciones principales de un hotel, facilitando la administración de recursos y la gestión de reservas de manera eficiente.

---

#  Tecnologías Utilizadas

## Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose (ODM)
* JSON Web Tokens (JWT)
* Winston (Logging)

---

#  Arquitectura del Sistema

La aplicación sigue una arquitectura desacoplada basada en API REST.

```
Frontend (React)
        │
        ▼
API REST (Node.js + Express)
        │
        ▼
ODM (Mongoose)
        │
        ▼
Base de Datos (MongoDB)
```

Principios aplicados:

* Separación de responsabilidades
* Acceso a datos centralizado
* Validación en backend
* Seguridad mediante autenticación por token
* Comunicación mediante API REST

---

#  Modelo de Datos

El sistema utiliza MongoDB como base de datos NoSQL, estructurada mediante **schemas de Mongoose**.

## Colecciones principales

### Users

Usuarios del sistema.

Campos principales:

* nombre
* email
* password
* rol
* createdAt

---

### Clients

Clientes del hotel.

Campos principales:

* nombre
* apellido
* telefono
* email

---

### Rooms

Habitaciones del hotel.

Campos principales:

* numero
* tipo
* precioNoche
* estado

---

### Reservations

Reservas realizadas por clientes.

Campos principales:

* clienteId
* usuarioId
* fechaInicio
* fechaFin
* habitaciones
* total
* estado

---

### Payments

Pagos asociados a reservas.

Campos principales:

* reservationId
* monto
* metodo
* fecha
* estado

---

#  API REST

La comunicación entre frontend y backend se realiza mediante endpoints REST.

## Endpoints principales

### Autenticación

```
POST /api/auth/login
POST /api/auth/register
```

---

### Clientes

```
GET /api/clients
POST /api/clients
PUT /api/clients/:id
DELETE /api/clients/:id
```

---

### Habitaciones

```
GET /api/rooms
POST /api/rooms
PUT /api/rooms/:id
DELETE /api/rooms/:id
```

---

### Reservas

```
GET /api/reservations
POST /api/reservations
PUT /api/reservations/:id
DELETE /api/reservations/:id
```

---

### Pagos

```
GET /api/payments
POST /api/payments
PUT /api/payments/:id
DELETE /api/payments/:id
```

---

#  Seguridad

El sistema implementa autenticación basada en **JWT (JSON Web Tokens)**.

Flujo de autenticación:

1. El usuario inicia sesión.
2. El backend genera un token JWT.
3. El frontend almacena el token.
4. Cada petición protegida incluye el token en el header:

```
Authorization: Bearer TOKEN
```

Los endpoints protegidos requieren un token válido para ser accedidos.

---

#  Lógica de Negocio

La lógica de negocio del sistema se encuentra en la capa **Services**, separada de los controladores y del acceso a datos.

Ejemplos de reglas implementadas:

* No permitir reservas en habitaciones ocupadas.
* Validar fechas de entrada y salida.
* Calcular el total de la reserva en base al número de noches.
* Registrar pagos asociados a reservas existentes.

---

#  Sistema de Logging

Se utiliza **Winston** para registrar eventos importantes del sistema, tales como:

* errores del servidor
* excepciones
* autenticaciones
* creación de reservas
* registro de pagos

Los logs se almacenan en archivos dentro del directorio:

```
/logs
```

---

#  Estructura del Proyecto

```
project-root
│
├── backend
│   ├── controllers
│   ├── services
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── index.html
│
└── README.md
```

---

#  Instalación del Proyecto

## 1 Clonar repositorio

```
git clone https://github.com/usuario/stayflow.git
```

---

## 2 Instalar dependencias backend

```
cd backend
npm install
```

---

## 3 Instalar dependencias frontend

```
cd frontend
npm install
```

---

## 4 Variables de entorno

Crear archivo `.env` en el backend:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/hotel-system
JWT_SECRET=secret_key
```

---

## 5 Ejecutar proyecto

Backend:

```
npm run dev
```

Frontend:

```
npm run dev
```

---

#  Interfaz de Usuario

El frontend está desarrollado en React y utiliza un sistema de componentes reutilizables para mantener una interfaz consistente.

Características de la UI:

* diseño responsivo
* navegación mediante React Router
* dashboard de gestión
* formularios de administración
* manejo de estados y peticiones API

---

#  Futuras Mejoras

* Panel de reportes
* Integración con pasarelas de pago
* Gestión de disponibilidad en tiempo real
* Notificaciones automáticas
* Sistema de roles avanzado

---

#  Autor
  Jorge Humberto Gonzalez Morin
  Estefania
