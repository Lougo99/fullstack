package org.polytech.spring;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

@Component
public class FilmMapper {

    public FilmDto toDto(Film film) {
        return new FilmDto(
                film.getId(),
                film.getTitre(),
                film.getRealisateur(),
                film.getDateSortie(),
                film.getGenre(),
                film.getActeurs()
                        .stream()
                        .map(Acteur::getId)
                        .collect(Collectors.toSet())
        );
    }

    public Film toEntity(FilmCreationDto dto) {
        Film film = new Film();
        film.setTitre(dto.titre());
        film.setRealisateur(dto.realisateur());
        film.setDateSortie(dto.dateSortie());
        film.setGenre(dto.genre());
        return film;
    }
    public void updateEntity(Film film, FilmCreationDto dto) {
        film.setTitre(dto.titre());
        film.setRealisateur(dto.realisateur());
        film.setDateSortie(dto.dateSortie());
        film.setGenre(dto.genre());
    }
}