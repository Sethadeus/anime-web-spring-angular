package animeweb.controllers;

import animeweb.dto.TypeDTO;
import animeweb.models.Anime;
import animeweb.models.Type;
import animeweb.requests.CreateAnimeRequest;
import animeweb.requests.EditAnimeRequest;
import animeweb.responses.ApiResponseWithPages;
import animeweb.services.AnimeService;
import animeweb.services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/anime")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MainController {
    @Autowired
    private AnimeService animeService;

    @Autowired
    private TypeService typeService;

    @GetMapping("/all/")
    public ResponseEntity<?> getAllMovies(@RequestParam int page, @RequestParam int size) {
        Page<Anime> animePage = animeService.findAll(page, size);
        List<Anime> animes = animePage.getContent();

        if (animes.isEmpty()) {
            return ResponseEntity.ok(new ApiResponseWithPages<>("NOT_FOUND", animes, 0, 0, 0));
        }
        return ResponseEntity.ok(animes);
    }

    @PostMapping("/create/")
    public ResponseEntity<?> createAnime(@ModelAttribute CreateAnimeRequest request) throws Exception {
        try {
            animeService.save(request);
            return ResponseEntity.ok("Anime created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create anime");
        }
    }

    @PostMapping("/edit/")
    public ResponseEntity<?> editAnime(@ModelAttribute EditAnimeRequest request) throws Exception {
        try {
            animeService.edit(request);
            return ResponseEntity.ok("Anime created successfully");
        } catch (Exception e) {
            return ResponseEntity.ok("Failed to create anime");
        }
    }

    @GetMapping("/id/")
    public ResponseEntity<?> getById(@RequestParam UUID id) {
        Anime anime = animeService.findById(id);

        if (anime==null) {
            return ResponseEntity.ok(new ApiResponseWithPages<>("NOT_FOUND", null, 0, 0, 0));
        }
        return ResponseEntity.ok(anime);
    }

    @DeleteMapping("/delete/")
    public ResponseEntity<?> deleteAnime(@RequestParam String id){

        if (animeService.delete(id)){
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(false);
    }

}
