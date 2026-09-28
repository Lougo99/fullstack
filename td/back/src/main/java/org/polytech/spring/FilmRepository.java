package org.polytech.spring;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

@Repository
public class FilmRepository {
    private final List<Film> films = new ArrayList<>();

    public List<Film> findAll() {
        return films;
    }

    public Optional<Film> findById(Long id) {
        return films.stream()
                .filter(film -> film.getId().equals(id))
                .findFirst();
    }

    public Film save(Film film) {
        films.add(film);
        return film;
    }

    public boolean deleteById(Long id) {
        return films.removeIf(film -> film.getId().equals(id));
    }
}