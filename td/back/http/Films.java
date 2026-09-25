package org.polytech.spring;

public class Films {
    private long id;
    private String titre;
    private String realisateur;
    private String dateSortie;
    private genre genre;

    public Films(long id, String titre, String realisateur, String dateSortie, genre genre) {
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
    public genre getGenre() {
        return genre;
    }
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
