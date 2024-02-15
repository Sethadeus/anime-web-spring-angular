package animeweb.services;

import animeweb.models.Anime;
import animeweb.models.Genre;
import animeweb.repositories.AnimeRepository;
import animeweb.requests.CreateAnimeRequest;
import animeweb.requests.EditAnimeRequest;
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
public class AnimeService {

    private final AnimeRepository animeRepository;

    private final TypeService typeService;

    private final GenreService genreService;

    public Page<Anime> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return animeRepository.findAll(pageable);
    }

    public Anime findById(UUID id) {
        return animeRepository.findById(id).orElse(null);
    }

    public Anime save(CreateAnimeRequest req) throws Exception {
        Anime newanime = new Anime();
        newanime.setDesc(req.getDesc());
        newanime.setName(req.getName());
        newanime.setPlayer(req.getPlayer());
        newanime.setOriginalName(req.getOrigName());
        newanime.setDuration(Integer.parseInt(req.getDuration()));
        newanime.setRating(Double.valueOf(req.getRating()));
        newanime.setType(typeService.findById(Integer.parseInt(req.getType())));

        List<Genre> genreList = new ArrayList<>();

        for (String strId : req.getGenres()) {
            genreList.add(genreService.findById(Integer.parseInt(strId)));
        }

        newanime.setGenres(genreList);

        String fileUrl = FileService.saveFile(req.getFile());

        newanime.setImageUrl(fileUrl);

        return animeRepository.save(newanime);

    }

    public Anime edit(EditAnimeRequest request) throws Exception {

        Optional<Anime> editAnimeOpt = animeRepository.findById(UUID.fromString(request.getId()));

        if (editAnimeOpt.isPresent()) {
            Anime editAnime = editAnimeOpt.get();

            editAnime.setDesc(request.getDesc());
            editAnime.setName(request.getName());
            editAnime.setPlayer(request.getPlayer());
            editAnime.setOriginalName(request.getOrigName());
            editAnime.setDuration(Integer.parseInt(request.getDuration()));
            editAnime.setRating(Double.valueOf(request.getRating()));
            editAnime.setType(typeService.findById(Integer.parseInt(request.getType())));

            List<Genre> genreList = new ArrayList<>();

            for (String strId : request.getGenres()) {
                genreList.add(genreService.findById(Integer.parseInt(strId)));
            }
            editAnime.setGenres(genreList);
            if (request.getFile() != null) {
                String fileUrl = FileService.saveFile(request.getFile());
                editAnime.setImageUrl(fileUrl);
            }

            return animeRepository.save(editAnime);

        } else {

            return null;
        }
    }

    public boolean delete(String movieId) {
        Optional<Anime> deletedOpt = animeRepository.findById(UUID.fromString(movieId));
        if (deletedOpt.isPresent()) {
            animeRepository.delete(deletedOpt.get());
            return true;
        }
        return false;
    }
}
