package animeweb.requests;

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
public class EditAnimeRequest {
    private String id;
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
