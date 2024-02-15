package animeweb.repositories;

import animeweb.models.Anime;
import animeweb.models.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.UUID;

public interface TypeRepository extends JpaRepository<Type, Integer> {
    @NonNull
    Page<Type> findAll(@NonNull Pageable pageable);
}

