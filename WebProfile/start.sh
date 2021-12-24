docker stop $(docker ps -a -q)
docker build -t ted/web  .
sudo docker run -d -p 6969:80 -it fcsprofile