import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import bravisLogo from "@/assets/bravisLogo.png";
import {useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress.tsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {Info} from "lucide-react";


export default function Navbar() {
    const [timeLeft, setTimeLeft] = useState<string>("00:00:00");
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const parisTimezoneOffset = 0 * 60; // Offset de Paris en minutes (en fonction de l'heure d'été/hiver)

            // On crée un objet Date pour le prochain minuit heure de Paris
            const nextMidnight = new Date(now.setHours(24, 0, 0, 0)); // Minuit UTC
            nextMidnight.setMinutes(nextMidnight.getMinutes() + parisTimezoneOffset); // Ajout de l'offset Paris

            // Calcul du temps restant
            const timeDiff = nextMidnight.getTime() - Date.now();
            const totalSecondsInDay = 24 * 60 * 60;

            if (timeDiff <= 0) {
                setTimeLeft("00:00:00");
                setProgress(0);
                return;
            }

            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            // Formatage du compte à rebours
            setTimeLeft(
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            );

            // Calcul du pourcentage de temps écoulé
            const secondsLeft = hours * 3600 + minutes * 60 + seconds;
            const progressPercentage = ((totalSecondsInDay - secondsLeft) / totalSecondsInDay) * 100;
            setProgress(progressPercentage);
        };

        // Mettre à jour le timer chaque seconde
        const intervalId = setInterval(updateTimer, 1000);

        // Exécuter immédiatement la fonction pour afficher l'heure au lancement
        updateTimer();

        // Nettoyage à la suppression du composant
        return () => clearInterval(intervalId);
    }, []);
    return (

        <nav className="sticky top-0 border-b bg-background">
            <div className=" h-20 flex items-center justify-between container">

                <div className={'flex items-center space-x-10'}>
                    <Link to="/" className="flex items-center gap-3">
                        <img src={bravisLogo} alt="Bravis Logo"
                             className="w-8 h-8 rounded-full border border-gray-200"/>
                        <span className="font-bold text-xl">Bravis</span>
                    </Link>
                    <div className="items-center space-x-6 lg:flex hidden">
                        <Link to="/manifesto">Manifesto</Link>
                        <Link to="/themes">Thèmes</Link>
                    </div>
                </div>
                <div className="text-2xl font-bold  items-center gap-2 hidden lg:flex"><span className={'w-28'}>{timeLeft}</span>
                    <TooltipProvider >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className={'w-5 h-5'}/>
                        </TooltipTrigger>
                        <TooltipContent className={'mt-2'}>
                            <p>Temps restant avant la prochaine série de capsules</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider >
                </div>

                <div className=" items-center space-x-4 hidden lg:flex">
                    <Button variant="outline" disabled className="cursor-not-allowed opacity-50">
                        S'inscrire (soon)
                    </Button>
                    <Button disabled className="cursor-not-allowed opacity-50">
                        Connexion (soon)
                    </Button>
                </div>
            </div>
            <Progress value={progress} className="w-full h-1 animate-pulse transition"/>
        </nav>
    );
}