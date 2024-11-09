package com.example.back.service;

import com.example.back.dto.ArticleDTO;
import com.example.back.model.Article;
import com.example.back.repository.ArticleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    private List<Article> dailyArticles;

    // Refresh quotidien des articles aléatoires
    @Scheduled(cron = "0 0 0 * * ?", zone = "Europe/Paris")
    public void refreshDailyArticles() {
        dailyArticles = articleRepository.findRandomArticles(10);
        System.out.println("Articles sélectionnés pour la journée : " + LocalDate.now());
    }

    // Initialisation des articles au démarrage
    @PostConstruct
    public void initializeDailyArticles() {
        refreshDailyArticles();
    }

    // Récupère les articles quotidiens en tant que DTO
    public List<ArticleDTO> getDailyArticles() {
        return dailyArticles.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Convertit un Article en ArticleDTO
    private ArticleDTO convertToDTO(Article article) {
        return new ArticleDTO(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.getCreatedAt(),
                article.getTheme().getName()
        );
    }
}