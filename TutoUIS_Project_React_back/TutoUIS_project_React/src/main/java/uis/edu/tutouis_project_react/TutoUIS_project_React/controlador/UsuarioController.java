package uis.edu.tutouis_project_react.TutoUIS_project_React.controlador;

import uis.edu.tutouis_project_react.TutoUIS_project_React.modelo.Usuario;
import uis.edu.tutouis_project_react.TutoUIS_project_React.servicio.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173") // permitir llamadas desde Vite dev server
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {

        Usuario nuevoUsuario = usuarioService.save(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED); 
    }

    // Endpoint de login simple: acepta { codigo, contrasena } o { correo, contrasena }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody java.util.Map<String, String> creds) {
        String codigo = creds.getOrDefault("codigo", null);
        String correo = creds.getOrDefault("correo", null);
        String contrasena = creds.getOrDefault("contrasena", null);

        if ((codigo == null || codigo.isBlank()) && (correo == null || correo.isBlank())) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "Se requiere codigo o correo"));
        }
        if (contrasena == null) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "Se requiere contrasena"));
        }

        java.util.Optional<Usuario> optUsuario = java.util.Optional.empty();
        if (codigo != null && !codigo.isBlank()) {
            optUsuario = usuarioService.findByCodigoEstudiantil(codigo);
        }
        if (optUsuario.isEmpty() && correo != null && !correo.isBlank()) {
            optUsuario = usuarioService.findByCorreo(correo);
        }

        if (optUsuario.isPresent()) {
            Usuario u = optUsuario.get();
            // En este proyecto inicial la verificación es simple: comparar la contraseña en claro.
            // Si usas contraseñas hasheadas, aquí debes usar BCryptPasswordEncoder.matches(...)
            if (u.getContrasena() != null && u.getContrasena().equals(contrasena)) {
                // Eliminar campo contrasena antes de devolver
                u.setContrasena(null);
                return ResponseEntity.ok(u);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(java.util.Map.of("error", "Credenciales inválidas"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(java.util.Map.of("error", "Usuario no encontrado"));
        }
    }

    @GetMapping
    public List<Usuario> readAll() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> readById(@PathVariable String id) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@PathVariable String id, @RequestBody Usuario detallesUsuario) {
        Optional<Usuario> usuarioExistente = usuarioService.findById(id);
        
        if (usuarioExistente.isPresent()) {
            Usuario usuarioActualizar = usuarioExistente.get();
            
            usuarioActualizar.setNombre(detallesUsuario.getNombre());
            usuarioActualizar.setApellido(detallesUsuario.getApellido());
            usuarioActualizar.setTelefono(detallesUsuario.getTelefono());
            usuarioActualizar.setCarrera(detallesUsuario.getCarrera());
            
            return ResponseEntity.ok(usuarioService.save(usuarioActualizar));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (usuarioService.findById(id).isPresent()) {
            usuarioService.delete(id);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}