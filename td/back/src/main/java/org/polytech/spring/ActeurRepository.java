package org.polytech.spring;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ActeurRepository extends JpaRepository<Acteur, Long> {

    List<Acteur> findByFilmsId(Long filmId);
}