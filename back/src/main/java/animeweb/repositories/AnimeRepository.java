package animeweb.repositories;

import animeweb.models.Anime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.UUID;

public interface AnimeRepository extends JpaRepository<Anime, UUID> {
    @NonNull
    Page<Anime> findAll(@NonNull Pageable pageable);

}
