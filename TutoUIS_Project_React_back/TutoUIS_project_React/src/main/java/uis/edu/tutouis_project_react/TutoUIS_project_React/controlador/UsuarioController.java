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
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {

        Usuario nuevoUsuario = usuarioService.save(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED); 
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