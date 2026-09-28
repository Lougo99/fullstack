package org.polytech.spring;

public class FilmNotFoundException extends RuntimeException {
    public FilmNotFoundException(Long id) {
        super("Film introuvable avec l'identifiant : " + id);
    }
}