const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/loggingMiddleware'); 

const app = express();
const PORT = process.env.PORT || 3005;


app.use(bodyParser.json());
app.use(loggingMiddleware); 
app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
