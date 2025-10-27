// Connect express application to mongodb
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for Astro frontend
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "SweetTProductionKey";

// User Schema with timestamps
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], required: true, default: 'customer' }
});

const User = mongoose.model('User', userSchema);

// Initialize default users (run once) this is a fail safe incase the admin user gets deleted from the db
async function initializeAdmin() {
    try {
        // Only create admin user
        const adminExists = await User.findOne({ email: 'admin@gmail.com' });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                email: 'admin@gmail.com',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }

        // Remove customer user if exists (cleanup)
        await User.deleteOne({ email: 'customer@gmail.com' });
        
    } catch (error) {
        console.error('Error initializing admin:', error);
    }
}

// Login Route - ADMIN ONLY
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt for email:', email); // Debug log

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and password are required' 
            });
        }

        // ONLY ALLOW ADMIN LOGIN
        if (email.toLowerCase() !== 'admin@gmail.com') {
            console.log('Login rejected - not admin email:', email);
            return res.status(403).json({ 
                success: false, 
                message: 'Access denied. Admin only.' 
            });
        }

        // Find admin user only
        const user = await User.findOne({ email: 'admin@gmail.com' });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Admin account not found' 
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password for admin');
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Admin login successful'); // Debug log

        // Send response
        res.json({
            success: true,
            message: 'Admin login successful',
            token,
            user: {
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// Sign Up Route - DISABLED
app.post('/api/signup', async (req, res) => {
    // Signup is disabled - admin only system
    console.log('Signup attempt blocked - admin only system');
    return res.status(403).json({ 
        success: false, 
        message: 'User registration is disabled. Admin only system.' 
    });
});

// Protected route example - verify token middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ 
            success: false, 
            message: 'No token provided' 
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid token' 
        });
    }
};

// Example protected route
app.get('/api/verify', verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

// Connect to MongoDB
mongoose.connect(MONGOURL).then(async () => {
    console.log("Database connected successfully.");
    console.log("Database URL:", MONGOURL);
    
    // Initialize admin user only
    await initializeAdmin();
        
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Admin email: admin@gmail.com pass: admin123`);
    });
}).catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});