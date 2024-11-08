import { ReactNode } from "react";

interface ArticleProps {
    children: ReactNode;
}

export default function Article({ children }: ArticleProps) {
    return (
        <div className="prose mx-auto max-w-3xl py-4">
                {children}
        </div>
    );
}