package animeweb.dto;

import animeweb.user.Role;
import animeweb.user.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.Getter;

import java.io.Serializable;

@Data
public class UserDTO{
    @JsonProperty("username")
    private String username;
    @JsonProperty("email")
    private String email;
    @JsonProperty("role")
    private String role;

    public UserDTO(String username, String email, Role role) {
        this.username = username;
        this.email = email;
        this.role = String.valueOf(role);
    }
}
