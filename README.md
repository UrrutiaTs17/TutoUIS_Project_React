# TutoUIS - Proyecto React

Sistema de reserva de tutorías para la Universidad Industrial de Santander (UIS) desarrollado con React + Spring Boot.

## 📋 Descripción General

Este proyecto es una reimplementación del sistema TutoUIS utilizando React en el frontend, basándose en los diseños del proyecto original desarrollado en Angular. 

## 👥 Equipo de Desarrollo

| Desarrollador | GitHub | Código |
|---------------|--------|--------|
| **Hammer Ronaldo Muñoz Hernández** | [@HammerRo](https://github.com/HammerRo) | 2211918 |
| **Karen Dayana Mateus Gómez** | [@Kmateus8](https://github.com/Kmateus8) | 2212765 |
| **William Andrés Urrutia Torres** | [@UrrutiaTs17](https://github.com/UrrutiaTs17) | 2220058 |


## 🏗️ Estructura del Proyecto

```
TutoUIS_Project_React/
├── TutoUIS_Project_React_front/    # Frontend React
│   ├── src/
│   │   ├── components/             # Componentes reutilizables
│   │   ├── pages/                  # Páginas de la aplicación
│   │   ├── App.jsx                 # Configuración de rutas
│   │   └── main.jsx                # Punto de entrada
│   └── package.json
│
└── TutoUIS_Project_React_back/     # Backend Spring Boot
    └── TutoUIS_project_React/
        └── src/
```

## 🚀 Inicio Rápido

### Frontend

```bash
cd TutoUIS_Project_React_front
npm install
npm run dev
```

Acceder a: `http://localhost:5173/`

### Backend

```bash
cd TutoUIS_Project_React_back/TutoUIS_project_React
mvn spring-boot:run  
```

## 🎯 Características

- ✅ Página principal con información del sistema
- ✅ Página de login con validación de formularios
- ✅ Navegación entre páginas
- ✅ Diseño responsive
- ✅ Componentes modulares y reutilizables

## 🛠️ Tecnologías

### Frontend
- React 19.1.1
- React Router DOM
- Bootstrap 5.3.8
- Bootstrap Icons
- Vite

### Backend
- Spring Boot
- MongoDB
- Spring Data MongoDB
- Lombok
- Swagger/OpenAPI 


**Basado en**: [TutoUIS-Project Original](https://github.com/UrrutiaTs17/TutoUIS-Project)
