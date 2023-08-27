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
#### Method GET:
1 - Returns the "Home" view, which contains a list of products.
```
http://localhost:8080/
```
2 - Returns the "RealTimeProducts" view, which contains a list of products.
Additionally, products can be added or removed within this view using websockets.
```
http://localhost:8080/realtimeproducts
```
### Products:
#### Method GET:
1 - Returns an object with the list of all products or an error in case of failure.
```
http://localhost:8080/api/products
```
2 - Returns an object with the list of all products, limited to the size specified 
by the "limit" parameter, or an error in case of failure.
where X is an integer.
```
http://localhost:8080/api/products?limit=X
```
3 - Returns an object with the requested product or an error in case of failure.
where X is an integer.
```
http://localhost:8080/api/products/X
```
#### Method POST:
1 - An object with the product data to be added is sent in the body, and it returns
an object with the generated product or an error in case of failure.
```
http://localhost:8080/api/products
```
#### Method PUT:
1 - An object with the product data to be updated is sent in the body, and it returns
an object with the updated product or an error in case of failure.
where X is an integer.
```
http://localhost:8080/api/products/X
```
#### Method DELETE:
1 - Returns an object with the list of all products without the deleted product, or an error in case of failure.
where X is an integer.
```
http://localhost:8080/api/products/X
```
### Carts:
#### Method GET:
1 - Returns an object with the requested cart or an error in case of failure.
where X is an integer.
```
http://localhost:8080/api/carts/X
```
#### Method POST:
1 - Creates a new cart and returns an object with the new cart or an error in
case of failure.
```
http://localhost:8080/api/carts
```
2 - Adds product Y to cart X, returns an object with the updated cart or an
error in case of failure.
where X is an integer.
where Y is an integer.
```
http://localhost:8080/api/carts/X/product/Y
```