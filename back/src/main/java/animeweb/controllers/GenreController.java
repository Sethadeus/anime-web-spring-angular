package animeweb.controllers;

import animeweb.dto.GenreDTO;
import animeweb.dto.TypeDTO;
import animeweb.models.Anime;
import animeweb.models.Genre;
import animeweb.models.Type;
import animeweb.requests.CreateAnimeRequest;
import animeweb.requests.CreateGenreRequest;
import animeweb.responses.ApiResponseWithPages;
import animeweb.services.AnimeService;
import animeweb.services.GenreService;
import animeweb.services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genre")
@CrossOrigin(origins = "*", maxAge = 3600)
public class GenreController {
    @Autowired
    private GenreService genreService;

    @GetMapping("/all/")
    public ResponseEntity<?> getAllTypes() {
        List<GenreDTO> genrelist = genreService.findAll();

        if (genrelist.isEmpty()) {
            return ResponseEntity.ok(new ApiResponseWithPages<>("NOT_FOUND", genrelist, 0, 0, 0));
        }
        return ResponseEntity.ok(genrelist);
    }

    @PostMapping("/create/")
    public ResponseEntity<?> createGenre(@ModelAttribute CreateGenreRequest request) throws Exception {
        try {
            genreService.save(request);
            return ResponseEntity.ok("Genre created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create genre");
        }
    }

    @DeleteMapping("/delete/")
    public ResponseEntity<?> deleteAnime(@RequestParam Integer id){

        if (genreService.delete(id)){
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(false);
    }


}
