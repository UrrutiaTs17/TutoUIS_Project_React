package uis.edu.tutouis_project_react.TutoUIS_project_React.servicio;

import uis.edu.tutouis_project_react.TutoUIS_project_React.modelo.Usuario;
import uis.edu.tutouis_project_react.TutoUIS_project_React.repositorio.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service 
public class UsuarioService {

    @Autowired 
    private UsuarioRepository usuarioRepository;

    public Usuario save(Usuario usuario) {

        return usuarioRepository.save(usuario);
    }
    
    // 2. LEER TODOS (Read All)
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    // 3. LEER POR ID (Read One)
    public Optional<Usuario> findById(String id) {
        return usuarioRepository.findById(id);
    }

    // 4. ELIMINAR (Delete)
    public void delete(String id) {
        usuarioRepository.deleteById(id);
    }
      
    // Método para buscar usuario por correo (clave para el login)
    public Optional<Usuario> findByCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }
}