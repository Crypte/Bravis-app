# Utiliser l'image alpine de PostgreSQL pour une taille réduite
FROM postgres:14.1-alpine

# Définir les variables d'environnement pour configurer la base de données
ENV POSTGRES_DB=db \
    POSTGRES_USER=user \
    POSTGRES_PASSWORD=password

# Copier les fichiers SQL d'initialisation vers le répertoire de démarrage de PostgreSQL
COPY /docker-entrypoint-initdb.d /docker-entrypoint-initdb.d