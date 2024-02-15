package animeweb.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "anime")
public class Anime {
    @Id
    @Column(columnDefinition = "uuid")
    @GeneratedValue(generator = "uuid-ossp")
    private UUID id;

    private String name;

    private String originalName;

    private Double rating;

    private Integer duration;

    private String imageUrl;

    private String player;

    @Column(name = "description")
    private String desc;

    @JsonIgnoreProperties("animeList")
    @ManyToOne // Множество аниме могут относиться к одному типу
    @JoinColumn(name = "type_id") // Связь по столбцу type_id
    private Type type;

    @JsonIgnoreProperties("animes")
    @ManyToMany
    @JoinTable(name = "anime_genre",
            joinColumns = @JoinColumn(name = "anime_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<Genre> genres = new ArrayList<>();
}
