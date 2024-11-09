import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";

interface ThemeData {
    id: number
    name: string
}

export default function ThemeGrid() {
    const [themeData, setthemeData] = useState<ThemeData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/api/theme');

                if (!response.ok) {
                    throw new Error(`Erreur : ${response.statusText}`);
                }

                const data: ThemeData[] = await response.json();
                setthemeData(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Nos Thèmes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themeData.map((theme, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="flex flex-col items-center">
                            <CardTitle className="mt-4 text-xl">{theme.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-center text-muted-foreground">Description</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}