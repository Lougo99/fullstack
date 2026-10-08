package org.polytech.spring;

import java.time.LocalDate;
import java.util.Set;

public record FilmCreationDto(
        String titre,
        String realisateur,
        LocalDate dateSortie,
        Genre genre,
        Set<Long> acteursIds) {
}