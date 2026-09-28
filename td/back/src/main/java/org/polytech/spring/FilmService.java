package org.polytech.spring;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class FilmService {

    private final FilmRepository repository;

    public FilmService(FilmRepository repository) {
        this.repository = repository;
    }

    public List<Film> findAll() {
        return repository.findAll();
    }

    public Film findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new FilmNotFoundException(id));
    }

    public Film save(Film film) {
        return repository.save(film);
    }

    public Film update(Long id, Film film) {
        Film existingFilm = findById(id);

        existingFilm.setTitre(film.getTitre());
        existingFilm.setRealisateur(film.getRealisateur());
        existingFilm.setDateSortie(film.getDateSortie());
        existingFilm.setGenre(film.getGenre());

        return existingFilm;
    }

    public void delete(Long id) {
        if (!repository.deleteById(id)) {
            throw new FilmNotFoundException(id);
        }
    }
}