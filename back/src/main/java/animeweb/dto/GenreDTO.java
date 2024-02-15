package animeweb.dto;

import animeweb.models.Genre;
import animeweb.models.Type;
import lombok.Data;

@Data
public class GenreDTO {
    private Integer id;
    private String name;

    public GenreDTO(Genre genre){
        this.id = genre.getId();
        this.name = genre.getName();
    }
}
