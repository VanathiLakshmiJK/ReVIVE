// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const retailerRegRoute = require('./routes/retailer-reg-route');
const shopkeeperRegRoute = require('./routes/small-reg-route');
const retailerDashRoute = require('./routes/retailer-dash-route');
const tailorDashRoute = require('./routes/tailor-dash-route');
const tailorUploadRoute = require("./routes/tailor-upload-route");
const shopkeeperDashboardRoute = require("./routes/small-dash-route");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to handle CORS and JSON parsing
app.use(cors({ origin: 'http://127.0.0.1:5500' })); // Adjust origin as needed
app.use(express.json({ limit: '50mb' })); // Set large payload limit
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/api/tailors", tailorUploadRoute);
app.use(express.json());

// Tailor schema and registration route (unchanged)
const tailorSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    sizes: [String]
});

const Tailor = mongoose.model('Tailor', tailorSchema);

app.post('/api/tailors/register', async (req, res) => {
    try {
        const { name, phone, address, sizes } = req.body;
        const tailor = new Tailor({ name, phone, address, sizes });
        await tailor.save();
        res.status(201).json({ message: 'Tailor registered successfully!' });
    } catch (error) {
        console.error('Error registering tailor:', error);
        res.status(500).json({ message: 'Error registering tailor' });
    }
});

// Use additional routes for retailers and shopkeepers
app.use('/api/retailers', retailerRegRoute);
app.use('/api/shopkeepers', shopkeeperRegRoute);
app.use('/api/retailer-dashboard', retailerDashRoute);  // Retailer dashboard route
app.use('/api/tailor-dashboard', tailorDashRoute);       // Tailor dashboard route
app.use("/api/shopkeeper-dashboard", shopkeeperDashboardRoute);
app.use(shopkeeperDashboardRoute); // Mounting the routes
// Add a new route to fetch the list of uploaded clothes
app.get('/api/retailer-dashboard/list', async (req, res) => {
    try {
        const clothItems = await RetailerDashboard.find(); // Fetch from your database
        res.json(clothItems);
    } catch (error) {
        console.error('Error fetching cloth items:', error);
        res.status(500).json({ message: 'Failed to fetch cloth items' });
    }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
