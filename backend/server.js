const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({ origin: '*' })); 

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/transactionRoutes'));
app.use('/api', require('./routes/customerRoutes'));

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

