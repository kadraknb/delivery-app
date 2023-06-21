docker exec -it app_backend sh -c "
  npx sequelize-cli db:drop
"
printf "\n> O banco de dados foi dropado.\n\n"
