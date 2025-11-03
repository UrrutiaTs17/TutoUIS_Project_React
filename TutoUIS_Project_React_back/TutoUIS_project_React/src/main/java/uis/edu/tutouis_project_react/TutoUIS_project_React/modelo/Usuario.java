package uis.edu.tutouis_project_react.TutoUIS_project_React.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.Date;
import java.util.Map; 

@Data 
@Document(collection = "usuarios")
public class Usuario {

    @Id
    private String id; 

    private String nombre;
    private String apellido;
    private String correo;
    private String contrasena;
    private String telefono;
    private boolean activo;
    private boolean bloqueado;

    private Map<String, Object> rol;
    
    private Map<String, Object> carrera; 

    private String codigoEstudiantil; 
    private Date fechaCreacion;
    private Date fechaUltimaModificacion;

}