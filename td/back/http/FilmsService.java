@Service
public class FilmsService {
    public Films saveFilm(Films film) {
        // Logique pour sauvegarder le film dans la base de données
        return store.save(film);
    }
    
}
