cd ./app

kill -9 $(lsof -t -i:3000) &> /dev/null
kill -9 $(lsof -t -i:3001) &> /dev/null
kill -9 $(lsof -t -i:3002) &> /dev/null

docker-compose up -d --build

printf "\n> A aplicação foi iniciada.\n\n"
printf "> http://localhost:3000/login.\n\n"
