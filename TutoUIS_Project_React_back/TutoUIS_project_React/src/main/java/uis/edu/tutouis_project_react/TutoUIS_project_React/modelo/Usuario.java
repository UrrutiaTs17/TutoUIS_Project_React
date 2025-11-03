package uis.edu.tutouis_project_react.TutoUIS_project_React.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.util.Date;
import java.util.Map; 

@Data 
@Document(collection = "usuarios")
@Schema(description = "Modelo de Usuario del sistema TutoUIS")
public class Usuario {

    @Id
    @Schema(description = "ID único del usuario en MongoDB", example = "507f1f77bcf86cd799439011")
    private String id; 

    @Schema(description = "Nombre del usuario", example = "Juan", required = true)
    private String nombre;
    
    @Schema(description = "Apellido del usuario", example = "Pérez", required = true)
    private String apellido;
    
    @Schema(description = "Correo electrónico del usuario", example = "juan.perez@correo.uis.edu.co", required = true)
    private String correo;
    
    @Schema(description = "Contraseña del usuario (se almacena en texto plano - NO recomendado en producción)", 
            example = "password123", required = true)
    private String contrasena;
    
    @Schema(description = "Número de teléfono del usuario", example = "3001234567")
    private String telefono;
    
    @Schema(description = "Indica si el usuario está activo en el sistema", example = "true")
    private boolean activo;
    
    @Schema(description = "Indica si el usuario está bloqueado", example = "false")
    private boolean bloqueado;

    @Schema(description = "Información del rol del usuario", 
            example = "{ \"nombre\": \"Estudiante\" }")
    private Map<String, Object> rol;
    
    @Schema(description = "Información de la carrera del usuario", 
            example = "{ \"nombre\": \"Ingeniería de Sistemas\" }")
    private Map<String, Object> carrera; 

    @Schema(description = "Código estudiantil único del usuario", example = "2180254", required = true)
    private String codigoEstudiantil; 
    
    @Schema(description = "Fecha de creación del registro", example = "2025-11-03T10:30:00.000Z")
    private Date fechaCreacion;
    
    @Schema(description = "Fecha de última modificación del registro", example = "2025-11-03T15:45:00.000Z")
    private Date fechaUltimaModificacion;

}