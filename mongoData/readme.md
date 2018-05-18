# Docker how-to

# create image
```bash
docker build . -t cloudy-data
```

# run container
```bash
docker run --name cloudy-data-store -d -p 27017:27017 cloudy-data
```

# conect to bash
```bash
docker exec -it cloudy-data-store  bash
```

# Utils
## List images
```bash
docker images
```

## containers
```bash
docker ps
```
