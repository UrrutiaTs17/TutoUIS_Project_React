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
    
    // 2. LEER TODOS 
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    // 3. LEER POR ID 
    public Optional<Usuario> findById(String id) {
        return usuarioRepository.findById(id);
    }

    // 4. ELIMINAR 
    public void delete(String id) {
        usuarioRepository.deleteById(id);
    }
      
    // Método para buscar usuario por correo 
    public Optional<Usuario> findByCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    // Método para buscar por código estudiantil
    public Optional<Usuario> findByCodigoEstudiantil(String codigo) {
        return usuarioRepository.findByCodigoEstudiantil(codigo);
    }
}