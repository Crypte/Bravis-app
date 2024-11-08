package com.example.back.service;
import com.example.back.model.Article;
import com.example.back.repository.ArticleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;


@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    private List<Article> dailyArticles;

    // Daily mix
    @Scheduled(cron = "0 0 0 * * ?", zone = "Europe/Paris")
    public void refreshDailyArticles() {
        dailyArticles = articleRepository.findRandomArticles(10);
        System.out.println("Articles sélectionnés pour la journée : " + LocalDate.now());
    }

    // Startup
    @PostConstruct
    public void initializeDailyArticles() {
        refreshDailyArticles();
    }

    public List<Article> getDailyArticles() {
        return dailyArticles;
    }
}