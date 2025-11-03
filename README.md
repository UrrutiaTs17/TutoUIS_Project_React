# TutoUIS - Proyecto React

Sistema de reserva de tutorías para la Universidad Industrial de Santander (UIS) desarrollado con React + Spring Boot.

## 📋 Descripción General

Este proyecto es una reimplementación del sistema TutoUIS utilizando React en el frontend, basándose en los diseños del proyecto original desarrollado en Angular. 

### Estado Actual del Proyecto

**Frontend (React)**: ✅ Implementado
- Vistas de Home y Login completamente diseñadas
- Componentes reutilizables (Header, Footer)
- Sistema de rutas configurado
- Diseño responsive
- Animaciones y estilos modernos

**Backend (Spring Boot)**: ⏳ Pendiente de desarrollo
- La conexión a la base de datos se implementará posteriormente

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

Accede a: `http://localhost:5173/`

### Backend

```bash
cd TutoUIS_Project_React_back/TutoUIS_project_React
# Por implementar
```

## 📚 Documentación Detallada

Para más información sobre el frontend, consulta el [README del Frontend](./TutoUIS_Project_React_front/README.md)

## 🎯 Características Actuales

- ✅ Página principal (Home) con información del sistema
- ✅ Página de login con validación de formularios
- ✅ Navegación entre páginas
- ✅ Diseño responsive
- ✅ Componentes modulares y reutilizables
- ✅ Animaciones y efectos visuales

## 🔜 Próximas Implementaciones

- [ ] Desarrollo del backend con Spring Boot
- [ ] Conexión con base de datos
- [ ] Sistema de autenticación real
- [ ] Vista de Dashboard para estudiantes
- [ ] Sistema de reservas de tutorías
- [ ] Gestión de usuarios y roles
- [ ] Calendario de disponibilidad

## 🛠️ Tecnologías

### Frontend
- React 19.1.1
- React Router DOM
- Bootstrap 5.3.8
- Bootstrap Icons
- Vite

### Backend (Planeado)
- Spring Boot
- MySQL/PostgreSQL
- JPA/Hibernate
- Spring Security

## 👥 Autores

Proyecto desarrollado para la Universidad Industrial de Santander (UIS)

## 📄 Licencia

Este proyecto es parte de un trabajo académico de la UIS.

---

**Basado en**: [TutoUIS-Project Original](https://github.com/UrrutiaTs17/TutoUIS-Project)
