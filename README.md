# Keepcoding API Final Project

### Run
* Run app
```sh
	npm start
```
* Create db in mongodb and load data
```sh
	npm installDB
```

### Database model 
    
[HTML Documentation](https://github.com/eduardovizuete/nodeApiFinal/blob/master/nodeapi/docs/db_doc/html_doc/dbdoc.html)
        
        /nodeapi/docs/db_doc/html_doc/dbdoc.html
        
[Database model mongodb](https://github.com/eduardovizuete/nodeApiFinal/blob/master/nodeapi/docs/db_doc/html_doc_svg/dbdocsvg.svg)

        Create with: DbSchema Free Edition
        
### API endpoints

The REST API have following functions.

| Method   |Endpoints            |  Notes             |
|----------|:-------------:      |------------------: |
| GET      | /category           | Get all categories |
| GET      | /category/:id       | Get single category|
| POST     | /category           | Add category       |
| PUT      | /category/:id       | Update category    |
| DELETE   | /category/:category | Delete category    |


| Method   |Endpoints      |  Notes             |
|----------|:-------------:|------------------: |
| GET      | /user         | Get all users      |
| GET      | /user/:id     | Get single user    |
| POST     | /user         | Add user           |
| PUT      | /user/:id     | Update user        |
| DELETE   | /user/:user   | Delete user        |


| Method   |Endpoints           |  Notes             |
|----------|:-------------:     |------------------: |
| GET      |  /product          | Get all products   |
| GET      |  /product/:id      | Get single product |
| POST     |  /product          | Add product        |
| PUT      |  /product/:id      | Update product     |
| DELETE   |  /product/:product | Delete product     |


| Method   |Endpoints                 |  Notes                 |
|----------|:-------------:           |------------------:     |
| GET      |/transaction              | Get all transactions   |
| GET      |/transaction/:id          | Get single transaction |
| POST     |/transaction              | Add transaction        |
| PUT      |/transaction/:id          | Update transaction     |
| DELETE   |/transaction/:transaction | Delete transaction     |


| Method   |Endpoints                 |  Notes                 |
|----------|:-------------:           |------------------:     |
| GET      |/savedSearch              | Get all searches       |
| GET      |/savedSearch/:id          | Get single search      |
| POST     |/savedSearch              | Add search             |
| PUT      |/savedSearch/:id          | Update search          |
| DELETE   |/savedSearch/:savedSearch | Delete search          |


| Method   |Endpoints        |  Notes            |
|----------|:-------------:  |------------------:|
| GET      |/image           | Get all images    |
| GET      |/image/:id       | Get single image  |
| POST     |/image           | Add image         |
| PUT      |/image/:id       | Update image      |
| DELETE   |/image/:image    | Delete image      |

