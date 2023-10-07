const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const paperRoutes = require('./routes/paperRoutes');

const app = express();

// ... rest of the server setup, including MongoDB connection

const MONGODB_URI = "mongodb+srv://aragaosm:Mams0599@scribe-sync.hl5echs.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


app.use(cors());
app.use(express.json());

// Use routes
app.use(userRoutes);

app.use(paperRoutes)

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
