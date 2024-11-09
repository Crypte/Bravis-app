package com.example.back.repository;
import com.example.back.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    // 10 random articles
    @Query(value = "SELECT * FROM article ORDER BY RANDOM() LIMIT :limit", nativeQuery = true)
    List<Article> findRandomArticles(@Param("limit") int limit);
}