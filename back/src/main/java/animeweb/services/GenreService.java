package animeweb.services;

import animeweb.dto.GenreDTO;
import animeweb.dto.TypeDTO;
import animeweb.models.Anime;
import animeweb.models.Genre;
import animeweb.models.Type;
import animeweb.repositories.GenreRepository;
import animeweb.requests.CreateAnimeRequest;
import animeweb.requests.CreateGenreRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GenreService {

    private final GenreRepository genreRepository;

    public List<GenreDTO> findAll() {
        List<Genre> genreList = genreRepository.findAll();

        List<GenreDTO> genreListDTO= new ArrayList<GenreDTO>();

        for (Genre g: genreList){
            genreListDTO.add(new GenreDTO(g));
        }

        return genreListDTO;

    }

    public Genre findById(Integer id){
        return genreRepository.findById(id).orElse(null);
    }

    public Genre save(CreateGenreRequest req) throws Exception {
        Genre newGenre = new Genre();
        newGenre.setName(req.getName());
        newGenre.setAnimes(new ArrayList<Anime>());

        Genre sg = genreRepository.save(newGenre);


        System.out.println(123);
        return sg;

    }

    public boolean delete(Integer id) {
        Optional<Genre> deletedOpt = genreRepository.findById(id);
        if (deletedOpt.isPresent()) {
            genreRepository.delete(deletedOpt.get());
            return true;
        }
        return false;
    }

}
