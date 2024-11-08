package com.example.back.controller;

import com.example.back.model.Article;
import com.example.back.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping("/api/articles/random")
    public List<Article> getDailyArticles() {
        return articleService.getDailyArticles();
    }
}