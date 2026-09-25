@RestController
@RequestMapping("/Films")
public class FilmsController {
    private List<Films> filmsList = new ArrayList<>();

    @GetMapping
    public List<Films> getAllFilms() {
        return filmsList;
    }

    @GetMapping("/{id}")
    public Films getFilmById(@PathVariable long id) {
        return filmsList.stream()
                .filter(film -> film.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public void addFilm(@RequestBody Films film) {
        filmsList.add(film);
    }

    @PutMapping("/{id}")
    public void updateFilm(@PathVariable long id, @RequestBody Films updatedFilm) {
        filmsList.removeIf(film -> film.getId() == id);
        filmsList.add(updatedFilm);
    }

    @DeleteMapping("/{id}")
    public void deleteFilm(@PathVariable long id) {
        filmsList.removeIf(film -> film.getId() == id);
    }

}
