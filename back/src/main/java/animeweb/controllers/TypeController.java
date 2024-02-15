package animeweb.controllers;

import animeweb.dto.TypeDTO;
import animeweb.models.Anime;
import animeweb.models.Type;
import animeweb.requests.CreateGenreRequest;
import animeweb.responses.ApiResponseWithPages;
import animeweb.services.AnimeService;
import animeweb.services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/type")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TypeController {
    @Autowired
    private TypeService typeService;

    @GetMapping("/all/")
    public ResponseEntity<?> getAllTypes() {
        List<TypeDTO> typelist = typeService.findAll();

        if (typelist.isEmpty()) {
            return ResponseEntity.ok(new ApiResponseWithPages<>("NOT_FOUND", typelist, 0, 0, 0));
        }
        return ResponseEntity.ok(typelist);
    }

    @PostMapping("/create/")
    public ResponseEntity<?> createType(@ModelAttribute CreateGenreRequest request) throws Exception {
        try {
            typeService.save(request);
            return ResponseEntity.ok("Type created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create type");
        }
    }

    @DeleteMapping("/delete/")
    public ResponseEntity<?> deleteAnime(@RequestParam Integer id){

        if (typeService.delete(id)){
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(false);
    }

}
