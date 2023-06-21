docker exec -it app_backend sh -c "
  npx sequelize-cli db:drop &&
  npx sequelize-cli db:create &&
  npx sequelize-cli db:migrate &&
  npx sequelize-cli db:seed:all
"

printf "\n> Script terminado\n\n"
