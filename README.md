## Docker
Easiest way to start the app is by using containers:
* Run `docker-compose build` to build containers
* Run `docker-compose up` to start mongo on port 27017 and web app on port 3000
* Run `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up` after building to run docker for development (local files)

## api
`cloudy-api/test/web`

## Docker tag
`docker tag really-cloudy_web karpikpl/really-cloudy_web`
`docker tag really-cloudy_nginx karpikpl/really-cloudy_nginx`
`docker tag really-cloudy_seed karpikpl/really-cloudy_seed`

## Docker push
first `docker login`

then
```
docker push karpikpl/really-cloudy_nginx
docker push karpikpl/really-cloudy_seed
docker push karpikpl/really-cloudy_web
```
