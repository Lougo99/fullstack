package org.polytech.spring;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class FilmService {

    private final FilmRepository filmRepository;
    private final ActeurRepository acteurRepository;
    private final FilmMapper filmMapper;

    public FilmService(
            FilmRepository filmRepository,
            ActeurRepository acteurRepository,
            FilmMapper filmMapper) {
        this.filmRepository = filmRepository;
        this.acteurRepository = acteurRepository;
        this.filmMapper = filmMapper;
    }

    public List<FilmDto> findAll() {
        return filmRepository.findAll()
                .stream()
                .map(filmMapper::toDto)
                .toList();
    }

    public FilmDto findById(Long id) {
        Film film = filmRepository.findById(id)
                .orElseThrow(() -> new FilmNotFoundException(id));

        return filmMapper.toDto(film);
    }

    public FilmDto save(FilmCreationDto dto) {
        Film film = filmMapper.toEntity(dto);

        if (dto.acteursIds() != null) {
            film.setActeurs(
                    acteurRepository.findAllById(dto.acteursIds())
                            .stream()
                            .collect(java.util.stream.Collectors.toSet())
            );
        }

        Film savedFilm = filmRepository.save(film);
        return filmMapper.toDto(savedFilm);
    }

    public List<FilmDto> findByActeur(Long acteurId) {
        return filmRepository.findByActeursId(acteurId)
                .stream()
                .map(filmMapper::toDto)
                .toList();
    }

    public List<Acteur> findActeursByFilm(Long filmId) {
        return acteurRepository.findByFilmsId(filmId);
    }

    public FilmDto update(Long id, FilmCreationDto dto) {
        Film film = filmRepository.findById(id)
                .orElseThrow(() -> new FilmNotFoundException(id));

        filmMapper.updateEntity(film, dto);

        return filmMapper.toDto(filmRepository.save(film));
    }

    public void delete(Long id) {
        if (!filmRepository.existsById(id)) {
            throw new FilmNotFoundException(id);
        }

        filmRepository.deleteById(id);
    }
}