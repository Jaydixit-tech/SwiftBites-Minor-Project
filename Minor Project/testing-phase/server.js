const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 8080;

// Performance optimizations
app.use(compression()); // Compress responses
app.use(express.json({ limit: '10mb' })); // Increased limit with reasonable bound
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cache control headers
const cacheControl = (req, res, next) => {
    // Cache static assets for 1 day
    res.setHeader('Cache-Control', 'public, max-age=86400');
    next();
};

// CORS with optimized options
const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // Cache preflight requests for 24 hours
};
app.use(cors(corsOptions));

// Serve static files with caching
app.use(express.static('testing-phase', {
    maxAge: '1d',
    etag: true,
    lastModified: true
}));
app.use(cacheControl);

// In-memory cache for admin data
let adminCache = null;
let adminCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Admin data file management
const adminDataFile = path.join(__dirname, 'admin-data.json');

async function ensureAdminDataFile() {
    try {
        await fs.access(adminDataFile);
    } catch {
        const initialData = {
            admins: [{
                username: 'admin123',
                password: '123',
                email: 'admin@example.com',
                createdAt: new Date().toISOString()
            }]
        };
        await fs.writeFile(adminDataFile, JSON.stringify(initialData, null, 2));
        adminCache = initialData;
        adminCacheTime = Date.now();
    }
}

async function readAdminData() {
    try {
        // Return cached data if valid
        if (adminCache && (Date.now() - adminCacheTime) < CACHE_DURATION) {
            return adminCache;
        }

        const data = await fs.readFile(adminDataFile, 'utf8');
        adminCache = JSON.parse(data);
        adminCacheTime = Date.now();
        return adminCache;
    } catch (error) {
        console.error('Error reading admin data:', error);
        return { admins: [] };
    }
}

async function writeAdminData(data) {
    try {
        await fs.writeFile(adminDataFile, JSON.stringify(data, null, 2));
        adminCache = data;
        adminCacheTime = Date.now();
    } catch (error) {
        console.error('Error writing admin data:', error);
        throw new Error('Failed to save admin data');
    }
}

// Fast health check endpoint
app.get('/api/health', (_, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
});

// Optimized login endpoint
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        const adminData = await readAdminData();
        const admin = adminData.admins.find(a => 
            a.username === username && a.password === password
        );

        if (admin) {
            // Remove sensitive data before sending
            const { password, ...safeAdminData } = admin;
            res.json({
                success: true,
                message: 'Login successful',
                user: safeAdminData
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Optimized registration endpoint
app.post('/api/admin/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        const adminData = await readAdminData();
        
        if (adminData.admins.some(admin => admin.username === username)) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists'
            });
        }

        adminData.admins.push({
            username,
            password,
            email,
            createdAt: new Date().toISOString()
        });

        await writeAdminData(adminData);

        res.json({
            success: true,
            message: 'Registration successful'
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Graceful shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

async function shutdown() {
    console.log('Shutting down gracefully...');
    try {
        // Save any cached data
        if (adminCache) {
            await writeAdminData(adminCache);
        }
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
}

// Initialize server with optimized settings
async function startServer() {
    try {
        await ensureAdminDataFile();
        
        const server = app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });

        // Configure server timeouts
        server.keepAliveTimeout = 65000; // Slightly higher than ALB's idle timeout
        server.headersTimeout = 66000; // Slightly higher than keepAliveTimeout
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer(); 