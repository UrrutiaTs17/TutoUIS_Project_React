package uis.edu.tutouis_project_react.TutoUIS_project_React.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuración de Swagger/OpenAPI para la documentación de la API
 * 
 * Acceso a la documentación:
 * - Swagger UI: http://localhost:8080/swagger-ui.html
 * - OpenAPI JSON: http://localhost:8080/v3/api-docs
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("TutoUIS - API de Gestión de Tutorías")
                        .version("1.0.0")
                        .description(
                            "API REST para el sistema de reserva de tutorías de la Universidad Industrial de Santander (UIS). " +
                            "Esta API permite gestionar usuarios, reservas de tutorías, salas y horarios."
                        )
                        .contact(new Contact()
                                .name("Equipo TutoUIS")
                                .email("tutouis@uis.edu.co")
                                .url("https://github.com/UrrutiaTs17/TutoUIS-Project")
                        )
                        .license(new License()
                                .name("Proyecto Académico UIS")
                                .url("https://www.uis.edu.co")
                        )
                )
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Servidor de Desarrollo"),
                        new Server()
                                .url("https://api.tutouis.uis.edu.co")
                                .description("Servidor de Producción (Ejemplo)")
                ));
    }
}
