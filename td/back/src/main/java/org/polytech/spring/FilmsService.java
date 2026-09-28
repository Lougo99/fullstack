package org.polytech.spring;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class FilmsService {
    private final List<Films> films = new ArrayList<>();

    public Films saveFilm(Films film) {
        films.add(film);
        return film;
    }
}