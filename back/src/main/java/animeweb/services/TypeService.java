package animeweb.services;

import animeweb.dto.TypeDTO;
import animeweb.models.Anime;
import animeweb.models.Genre;
import animeweb.models.Type;
import animeweb.repositories.AnimeRepository;
import animeweb.repositories.TypeRepository;
import animeweb.requests.CreateGenreRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TypeService {

    private final TypeRepository typeRepository;

    public List<TypeDTO> findAll() {
        List<Type> typeList = typeRepository.findAll();
        List<TypeDTO> typeListDTO= new ArrayList<TypeDTO>();

        for (Type t: typeList){
            typeListDTO.add(new TypeDTO(t));
        }

        return typeListDTO;
    }

    public Type save(CreateGenreRequest req) throws Exception {
        Type newType = new Type();
        newType.setName(req.getName());

        Type sg = typeRepository.save(newType);

        return sg;
    }
    public boolean delete(Integer id) {
        Optional<Type> deletedOpt = typeRepository.findById(id);
        if (deletedOpt.isPresent()) {
            typeRepository.delete(deletedOpt.get());
            return true;
        }
        return false;
    }

    public Type findById(Integer id){
        return typeRepository.findById(id).orElse(null);
    }

}

