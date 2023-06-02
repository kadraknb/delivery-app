export NODE_ENV=development
cd ./app/backend

npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

printf "\n> O banco de dados foi inicializado.\n\n"
