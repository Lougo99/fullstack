package org.polytech.spring;

public class Films {
    private long id;
    private String titre;
    private String realisateur;
    private String dateSortie;
    private Genre genre;

    public Films() {}

    public Films(long id, String titre, String realisateur, String dateSortie, Genre genre) {
        this.id = id;
        this.titre = titre;
        this.realisateur = realisateur;
        this.dateSortie = dateSortie;
        this.genre = genre;
    }
    public long getId() {
        return id;
    }
    public String getTitre() {
        return titre;
    }
    public String getRealisateur() {
        return realisateur;
    }
    public String getDateSortie() {
        return dateSortie;
    }
    public Genre getGenre() {
        return genre;
    }
    public void setId(long id) {this.id = id;}
    public void setGenre(Genre genre) {this.genre = genre;}
    public void setTitre(String titre) {
        this.titre = titre;
    }
    public void setRealisateur(String realisateur) {
        this.realisateur = realisateur;
    }
    public void setDateSortie(String dateSortie) {
        this.dateSortie = dateSortie;
    }
    public void setGenre(genre genre) {
        this.genre = genre;
    }
}
