package com.example.back.dto;

import java.time.LocalDateTime;

public class ArticleDTO {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String themeName;

    // Constructeur
    public ArticleDTO(Long id, String title, String content, LocalDateTime createdAt, String themeName) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.themeName = themeName;
    }

    // Getters et setters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getThemeName() { return themeName; }
}
