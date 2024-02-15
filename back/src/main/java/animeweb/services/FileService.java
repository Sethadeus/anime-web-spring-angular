package animeweb.services;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;

public class FileService {

    private static final String UPLOAD_DIR = "G:/upload/";

    public static String saveFile(MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String fileName = Instant.now().toEpochMilli() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR, fileName);

        Files.write(filePath, file.getBytes());

        // Возвращаем URL для файла
        return "http://localhost:8080/upload/" + fileName;
    }

}