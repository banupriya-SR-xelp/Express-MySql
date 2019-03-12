# Express-MySql

create a database manully as "mydb" before u run the code
change the hostname,password according to ur mysql configuration
in sequelizer.js

#steps to run
#1.npm install / yarn install
it will install the express and sequelize
#2.node server.js ->
server running once server start running
#3.in chrome http://localhost:7000/

##-----------------------------------------------------
get:-
Request Type:- Get

Request url:- http://localhost:7000/customers/3
http://localhost:7000/

//using post man
##----------------------------------------------------
post:-
Request Type:- Post

Request url:- http://localhost:7000/customers

Request body param:-
{
"name":"banu",
"address":"mysur"
}
##-----------------------------------------------------------

put:-
Request Type:- Put

Request url:- http://localhost:7000/customers/1

change the name to priya whose id is 1

Request body param:-
{
"name":"priya",
}
##------------------------------------------------------------

delete:-
Request Type:- Delete

Request url:- http://localhost:7000/customers/1

delte the filed whose id is 1

#software needed

mysql
phpmyadmin
postman
