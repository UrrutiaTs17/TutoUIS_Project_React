# 🔐 Sistema de Autenticación - TutoUIS React

Este documento describe el sistema de autenticación y autorización implementado en el proyecto TutoUIS React.

## 📋 Características Implementadas

### ✅ Autenticación Completa
- Login con backend real (Spring Boot + MongoDB)
- Gestión de sesión con localStorage
- Context API para estado global de autenticación
- Redirección automática según rol del usuario
- Protección de rutas (Protected Routes)

### ✅ Roles de Usuario
1. **Estudiante** → Dashboard normal (`/dashboard`)
2. **Administrador** → Dashboard administrativo (`/admin-dashboard`)

## 🏗️ Arquitectura del Sistema

```
src/
├── context/
│   └── AuthContext.jsx          # Contexto global de autenticación
├── services/
│   └── authService.js           # Servicio de API para autenticación
├── guards/
│   └── ProtectedRoute.jsx       # Componente para proteger rutas
├── pages/
│   ├── Login.jsx                # Página de login
│   ├── Dashboard.jsx            # Dashboard para estudiantes
│   └── AdminDashboard.jsx       # Dashboard para administradores
└── components/
    └── Header.jsx               # Header con estado de autenticación
```

## 🔧 Componentes Principales

### 1. AuthContext (`src/context/AuthContext.jsx`)

Provee el estado global de autenticación a toda la aplicación.

**Funciones disponibles:**
- `login(codigo, contrasena)` - Inicia sesión
- `logout()` - Cierra sesión
- `isAuthenticated()` - Verifica si hay usuario autenticado
- `isAdmin()` - Verifica si el usuario es administrador
- `getUserRole()` - Obtiene el rol del usuario
- `user` - Objeto con datos del usuario actual
- `loading` - Estado de carga

**Uso:**
```jsx
import { useAuth } from '../context/AuthContext';

function MiComponente() {
  const { user, login, logout, isAuthenticated, isAdmin } = useAuth();
  
  // ... tu código
}
```

### 2. authService (`src/services/authService.js`)

Maneja las peticiones HTTP al backend y el localStorage.

**Métodos:**
- `login(codigo, contrasena)` - POST a `/api/usuarios/login`
- `logout()` - Limpia localStorage
- `getCurrentUser()` - Obtiene usuario del localStorage
- `isAuthenticated()` - Verifica autenticación
- `getUserRole()` - Obtiene nombre del rol
- `isAdmin()` - Verifica si es admin

### 3. ProtectedRoute (`src/guards/ProtectedRoute.jsx`)

Componente para proteger rutas que requieren autenticación.

**Props:**
- `children` - Componente a renderizar si está autenticado
- `requireAdmin` - (opcional) Si requiere rol de administrador

**Uso:**
```jsx
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/admin-dashboard" 
  element={
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
```

## 🚀 Flujo de Autenticación

### 1. Login
```
Usuario ingresa credenciales
    ↓
Login.jsx llama a login() del AuthContext
    ↓
AuthContext llama a authService.login()
    ↓
authService hace POST a http://localhost:8080/api/usuarios/login
    ↓
Backend valida credenciales
    ↓
Si es válido: Guarda usuario en localStorage
    ↓
AuthContext actualiza estado global (user)
    ↓
Login.jsx redirige según rol:
  - Administrador → /admin-dashboard
  - Estudiante → /dashboard
```

### 2. Acceso a Ruta Protegida
```
Usuario intenta acceder a /dashboard
    ↓
ProtectedRoute verifica isAuthenticated()
    ↓
Si NO está autenticado → Redirige a /login
    ↓
Si SÍ está autenticado:
  - Verifica requireAdmin (si aplica)
  - Si es admin y requireAdmin=true → Permite acceso
  - Si NO es admin y requireAdmin=true → Redirige a /dashboard
  - Si requireAdmin=false → Permite acceso
```

### 3. Logout
```
Usuario hace clic en "Cerrar Sesión"
    ↓
Confirma acción
    ↓
logout() del AuthContext
    ↓
authService.logout() limpia localStorage
    ↓
AuthContext actualiza estado (user = null)
    ↓
Redirige a /login
```

## 📡 Conexión con Backend

### Endpoint de Login

**URL:** `POST http://localhost:8080/api/usuarios/login`

**Request Body:**
```json
{
  "codigo": "2180254",
  "contrasena": "miPassword123"
}
```

**Response (Éxito - 200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan.perez@correo.uis.edu.co",
  "telefono": "3001234567",
  "codigoEstudiantil": "2180254",
  "activo": true,
  "bloqueado": false,
  "rol": {
    "nombre": "Estudiante"
  },
  "carrera": {
    "nombre": "Ingeniería de Sistemas"
  }
}
```

**Response (Error - 401):**
```json
{
  "error": "Credenciales inválidas"
}
```

## 🎨 Vistas según Rol

### Dashboard de Estudiante (`/dashboard`)

**Características:**
- 📊 Estadísticas de reservas
- 📅 Nueva reserva
- 📋 Mis reservas
- ⏰ Historial
- 👤 Mi perfil
- ⚙️ Configuración

**Secciones:**
1. **Inicio** - Vista general con estadísticas
2. **Nueva Reserva** - (En desarrollo)
3. **Mis Reservas** - (En desarrollo)
4. **Historial** - (En desarrollo)
5. **Mi Perfil** - (En desarrollo)
6. **Configuración** - (En desarrollo)

### Dashboard de Administrador (`/admin-dashboard`)

**Características:**
- 👥 Gestión de usuarios
- 📅 Gestión de reservas
- 🏢 Gestión de salas
- ⏰ Gestión de horarios
- 📊 Reportes
- ⚙️ Configuración del sistema

**Secciones:**
1. **Dashboard** - Vista general con estadísticas admin
2. **Usuarios** - (En desarrollo)
3. **Reservas** - (En desarrollo)
4. **Salas** - (En desarrollo)
5. **Horarios** - (En desarrollo)
6. **Reportes** - (En desarrollo)
7. **Configuración** - (En desarrollo)

## 🔒 Seguridad

### LocalStorage
- Los datos del usuario se guardan en `localStorage.getItem('user')`
- Se eliminan al cerrar sesión
- **Nota:** En producción se recomienda usar tokens JWT y httpOnly cookies

### Rutas Protegidas
- Todas las rutas sensibles están envueltas en `<ProtectedRoute>`
- Verificación de autenticación antes de renderizar
- Verificación de rol para rutas de admin

### Validaciones
- Frontend: Campos requeridos, formato de datos
- Backend: Validación de credenciales, existencia de usuario

## 🧪 Testing

### Credenciales de Prueba

Deberás crear usuarios en tu base de datos MongoDB. Ejemplo:

**Estudiante:**
- Código: `2180254`
- Contraseña: `password123`
- Rol: `{ nombre: "Estudiante" }`

**Administrador:**
- Código: `2180001`
- Contraseña: `admin123`
- Rol: `{ nombre: "Administrador" }`

### Casos de Prueba

1. ✅ Login exitoso como estudiante → Redirige a `/dashboard`
2. ✅ Login exitoso como admin → Redirige a `/admin-dashboard`
3. ✅ Login con credenciales inválidas → Muestra error
4. ✅ Acceso a ruta protegida sin login → Redirige a `/login`
5. ✅ Estudiante intenta acceder a `/admin-dashboard` → Redirige a `/dashboard`
6. ✅ Logout → Limpia sesión y redirige a `/login`
7. ✅ Header muestra nombre de usuario cuando está autenticado
8. ✅ Header muestra botón "Iniciar Sesión" cuando NO está autenticado

## 🐛 Troubleshooting

### El login no funciona

1. **Verificar que el backend esté corriendo:**
   ```bash
   # El backend debe estar en http://localhost:8080
   curl http://localhost:8080/api/usuarios
   ```

2. **Verificar CORS en el backend:**
   El controller debe tener:
   ```java
   @CrossOrigin(origins = "http://localhost:5173")
   ```

3. **Revisar consola del navegador:**
   - F12 → Console
   - Buscar errores de red o CORS

### No redirige al dashboard después del login

1. Verificar que el objeto `user` tenga la propiedad `rol.nombre`
2. Revisar logs en consola: `console.log('✅ Login exitoso:', result.user);`
3. Verificar que el `navigate` se esté ejecutando

### Problemas con rutas protegidas

1. Verificar que el `AuthProvider` envuelva todo el `Router` en `App.jsx`
2. Verificar que el localStorage tenga el usuario guardado
3. Limpiar localStorage y volver a intentar: `localStorage.clear()`

## 📚 Próximos Pasos

- [ ] Implementar JWT tokens en lugar de guardar usuario completo
- [ ] Agregar refresh tokens
- [ ] Implementar "Remember Me"
- [ ] Agregar autenticación de dos factores (2FA)
- [ ] Implementar recuperación de contraseña
- [ ] Agregar indicador de sesión expirada
- [ ] Implementar interceptor de axios para agregar tokens automáticamente
- [ ] Agregar timeout de sesión por inactividad

---

**Última actualización:** 3 de noviembre de 2025
