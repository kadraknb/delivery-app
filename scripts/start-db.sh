docker exec -it app_backend sh -c "
  npx sequelize-cli db:create
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
"

printf "\n> O banco de dados foi inicializado.\n\n"
