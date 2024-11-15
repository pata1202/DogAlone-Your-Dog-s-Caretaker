const express = require('express');
const app = express();
const userRoutes = require('./routes');

app.use(express.json());
app.use(userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

