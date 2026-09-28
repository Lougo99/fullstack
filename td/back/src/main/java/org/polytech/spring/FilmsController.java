package org.polytech.spring;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
