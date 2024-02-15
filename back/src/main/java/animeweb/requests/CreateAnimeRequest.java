package animeweb.requests;

import animeweb.dto.GenreDTO;
import animeweb.dto.TypeDTO;
import animeweb.models.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateAnimeRequest {
    private String name;

    private String origName;
    private String desc;
    private String rating;

    private String player;

    private String duration;

    private String type;

    private List<String> genres;
    private MultipartFile file;
}
