const express = require('express');
require('dotenv').config();

const app = express();
const port = 4000

app.use(express.json());
app.use('/api', require('./routes/verify'));


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

