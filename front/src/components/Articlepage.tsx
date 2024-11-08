import {useEffect, useState} from 'react';
import Article from "@/components/Article";
import {marked} from 'marked';
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface ArticleData {
    id: number
    title: string;
    content: string; // Le contenu est en Markdown
}

export default function ArticlePage() {
    const [articleData, setArticleData] = useState<ArticleData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentArticle, setCurrentArticle] = useState(0)
    const nextArticle = () => setCurrentArticle((prev) => (prev + 1) % articleData.length)
    const prevArticle = () => setCurrentArticle((prev) => (prev - 1 + articleData.length) % articleData.length)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/api/articles/random');

                if (!response.ok) {
                    throw new Error(`Erreur : ${response.statusText}`);
                }

                const data: ArticleData[] = await response.json();
                setArticleData(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Défilement doux vers le haut
        });
    }, [currentArticle]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    // Vérification que l'article à l'index 8 existe
    const article = articleData[8];

    if (!article) {
        return <p>Aucun article disponible à cet index.</p>;
    }

    // Convertir le contenu Markdown en HTML
    const htmlContent = currentArticle !== null ? marked(articleData[currentArticle].content) : "";

    return (
        <>
            <Article>
                {/* Afficher le contenu de l'article converti en HTML */}
                <div dangerouslySetInnerHTML={{__html: htmlContent}}/>
            </Article>
            <div
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 p-2 rounded-full border shadow-lg transition-all duration-300 ease-in-out bg-background">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevArticle}
                        aria-label="Article précédent"
                        className="rounded-full transition-transform duration-200 ease-in-out hover:scale-110"
                    >
                        <ChevronLeft className="h-5 w-5"/>
                    </Button>
                    <span className="text-lg font-medium px-4 py-1 bg-primary/10 rounded-full">
      {currentArticle + 1} / {articleData.length}
    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextArticle}
                        aria-label="Article suivant"
                        className="rounded-full transition-transform duration-200 ease-in-out hover:scale-110"
                    >
                        <ChevronRight className="h-5 w-5"/>
                    </Button>
                </div>
            </div>
        </>
    );
}

