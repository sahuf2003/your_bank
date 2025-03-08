const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/transactionRoutes'));
app.use('/api', require('./routes/customerRoutes'));

app.listen(3000, () => console.log('Server running on port 3000'));
