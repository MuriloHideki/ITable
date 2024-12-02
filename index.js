    const express = require('express');
    const bodyParser = require('body-parser');
    const userRoutes = require('./routes/userRoutes');
    const tableRoutes = require('./routes/tableRoutes');
    const reservationRoutes = require('./routes/reservationRoutes');
    const restaurantRoutes = require('./routes/restaurantRoutes');

    const app = express();

    app.use(bodyParser.json());

    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.use('/', userRoutes);
    app.use('/', tableRoutes);
    app.use('/', reservationRoutes);
    app.use('/', restaurantRoutes);

    
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server is running...`);
    });
    