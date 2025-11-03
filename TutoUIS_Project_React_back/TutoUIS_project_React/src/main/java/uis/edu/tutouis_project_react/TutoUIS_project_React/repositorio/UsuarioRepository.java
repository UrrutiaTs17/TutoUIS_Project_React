package uis.edu.tutouis_project_react.TutoUIS_project_React.repositorio;

import uis.edu.tutouis_project_react.TutoUIS_project_React.modelo.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    Optional<Usuario> findByCorreo(String correo);
    
    boolean existsByCorreo(String correo);
}