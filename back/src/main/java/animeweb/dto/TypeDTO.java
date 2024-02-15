package animeweb.dto;

import animeweb.models.Type;
import lombok.Data;

@Data
public class TypeDTO {
    private Integer id;
    private String name;

    public TypeDTO(Type type){
        this.id = type.getId();
        this.name = type.getName();
    }
}
