package animeweb.repositories;

import animeweb.models.Genre;
import animeweb.models.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
    @NonNull
    List<Genre> findAll();
}