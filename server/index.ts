import express from 'express';
import path from 'path';
import loadRoutes from './routes/load.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// API Routes
app.use('/api/loads', loadRoutes);

// Serve static files from the Angular app if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist/browser')));
  
  // For all GET requests that aren't to the API, send back the Angular app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/browser/index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
