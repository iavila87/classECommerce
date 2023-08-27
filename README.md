# backend-ECommerce

## Installation

Project installation and associated dependencies. 
SSH:
```
$ git clone git@github.com:iavila87/classECommerce.git 
```
or HTTP:
```
$ git clone https://github.com/iavila87/classECommerce.git
```
```
$ cd classECommerce
```
```
$ npm install
$ npm run dev
```

## Endpoints
### Views:
#### Get:
1 - Returns the "Home" view, which contains a list of products.
```
http://localhost:8080/
```
2 - Returns the "RealTimeProducts" view, which contains a list of products.
Additionally, products can be added or removed within this view using websockets.
```
http://localhost:8080/realtimeproducts
```