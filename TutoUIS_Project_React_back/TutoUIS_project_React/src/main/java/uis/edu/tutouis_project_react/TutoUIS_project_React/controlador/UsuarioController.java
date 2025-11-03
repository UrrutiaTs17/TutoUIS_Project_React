package uis.edu.tutouis_project_react.TutoUIS_project_React.controlador;

import uis.edu.tutouis_project_react.TutoUIS_project_React.modelo.Usuario;
import uis.edu.tutouis_project_react.TutoUIS_project_React.servicio.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173") // permitir llamadas desde Vite dev server
@Tag(name = "Usuarios", description = "API para la gestión de usuarios del sistema TutoUIS")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Operation(
        summary = "Crear un nuevo usuario",
        description = "Crea un nuevo usuario en el sistema con todos sus datos"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Usuario creado exitosamente",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.save(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED); 
    }

    @Operation(
        summary = "Iniciar sesión",
        description = "Autentica un usuario mediante código estudiantil o correo y contraseña"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login exitoso",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "400", description = "Faltan credenciales"),
        @ApiResponse(responseCode = "401", description = "Credenciales inválidas")
    })
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

    @Operation(
        summary = "Listar todos los usuarios",
        description = "Obtiene la lista completa de usuarios registrados en el sistema"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de usuarios obtenida exitosamente",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class)))
    })
    @GetMapping
    public List<Usuario> readAll() {
        return usuarioService.findAll();
    }

    @Operation(
        summary = "Buscar usuario por ID",
        description = "Obtiene los datos de un usuario específico mediante su ID"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario encontrado",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> readById(
        @Parameter(description = "ID del usuario", required = true)
        @PathVariable String id
    ) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }
    
    @Operation(
        summary = "Actualizar usuario",
        description = "Actualiza los datos de un usuario existente"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario actualizado exitosamente",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Usuario.class))),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(
        @Parameter(description = "ID del usuario a actualizar", required = true)
        @PathVariable String id, 
        @RequestBody Usuario detallesUsuario
    ) {
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

    @Operation(
        summary = "Eliminar usuario",
        description = "Elimina un usuario del sistema de forma permanente"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Usuario eliminado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
        @Parameter(description = "ID del usuario a eliminar", required = true)
        @PathVariable String id
    ) {
        if (usuarioService.findById(id).isPresent()) {
            usuarioService.delete(id);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}