export NODE_ENV=development
cd ./app/backend
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

printf "\n> Script terminado\n\n"
