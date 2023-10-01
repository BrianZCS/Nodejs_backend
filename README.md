# Frontend HTML Page

index.html is the page that the user can use to add points, spend points, and check balance. 
The other way to send the request is through https://reqbin.com/post-online. 

# Backend Node.js

index.js is the backend implementation. The server will store all the points and trace the spending of points. 

# Three different functions in the application
1:http://localhost:8000/add \
2:http://localhost:8000/spend\
3:http://localhost:8000/balance \

# Method to Run the server

```
node index.js
```

The server will be running on the localhost:8000. 

# Requirements
```
npm init -yes
npm install express
npm i cors   
```