const express = require('express');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

/** express middleware */
app.use(express.json({ extended: false }));

/** Routes */
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/banks', require('./routes/banks'));
app.use('/api/transactions', require('./routes/transactions'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
