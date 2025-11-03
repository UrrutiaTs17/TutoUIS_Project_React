# TutoUIS - Proyecto React

Este es el proyecto TutoUIS desarrollado con React, basado en los diseños de las vistas principales del proyecto original desarrollado en Angular.

## 📋 Descripción

Sistema de reserva de tutorías para la Universidad Industrial de Santander (UIS). Este proyecto incluye las vistas de:
- **Home**: Página principal con información del sistema
- **Login**: Página de inicio de sesión para estudiantes

## 🚀 Tecnologías Utilizadas

- **React 19.1.1** - Biblioteca de JavaScript para construir interfaces de usuario
- **React Router DOM** - Enrutamiento para aplicaciones React
- **Bootstrap 5.3.8** - Framework CSS para diseño responsive
- **Bootstrap Icons** - Iconos oficiales de Bootstrap
- **Vite** - Herramienta de construcción rápida para desarrollo

## 📦 Instalación

1. Navega al directorio del proyecto:
```bash
cd TutoUIS_Project_React/TutoUIS_Project_React_front
```

2. Instala las dependencias:
```bash
npm install
```

## 🏃‍♂️ Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173/`

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.jsx      # Navegación principal
│   ├── Header.css
│   ├── Footer.jsx      # Pie de página
│   └── Footer.css
├── pages/              # Páginas de la aplicación
│   ├── Home.jsx        # Página principal
│   ├── Home.css
│   ├── Login.jsx       # Página de login
│   └── Login.css
├── App.jsx             # Componente raíz con rutas
├── App.css
├── main.jsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🎨 Características Implementadas

### Vista Home
- ✅ Diseño moderno con gradientes
- ✅ Cards informativas con iconos
- ✅ Botón de navegación a login con animación
- ✅ Logo de TutoUIS
- ✅ Responsive design

### Vista Login
- ✅ Formulario de autenticación
- ✅ Campo de código de estudiante
- ✅ Campo de contraseña con toggle de visibilidad
- ✅ Validación de campos
- ✅ Mensajes de error animados
- ✅ Panel de instrucciones
- ✅ Spinner de carga durante autenticación

### Componentes Globales
- ✅ Header con navegación
- ✅ Footer con información y enlace a GitHub
- ✅ Animaciones CSS personalizadas
- ✅ Diseño responsivo

## 🔄 Estado Actual

**Nota importante**: Esta versión incluye solo el frontend con datos simulados. La conexión a la base de datos se implementará en una fase posterior del desarrollo.

Las funcionalidades actuales incluyen:
- Navegación entre páginas (Home y Login)
- Diseño visual completo basado en el proyecto Angular
- Validación básica de formularios
- Simulación de proceso de login

## 🔜 Próximos Pasos

- [ ] Implementar autenticación real con backend
- [ ] Conectar con base de datos
- [ ] Agregar vista de Dashboard
- [ ] Implementar sistema de reservas
- [ ] Agregar gestión de usuarios
- [ ] Implementar calendario de tutorías

## 👥 Autores

Proyecto desarrollado para la Universidad Industrial de Santander (UIS)

## 📄 Licencia

Este proyecto es parte de un trabajo académico de la UIS.

---

**Repositorio GitHub**: [TutoUIS-Project](https://github.com/UrrutiaTs17/TutoUIS-Project)


## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
