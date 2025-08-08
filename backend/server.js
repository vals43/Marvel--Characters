
import express from 'express';
import cors from 'cors';
import charactersRoutes from './routes/characters.js';

const app = express();
const PORT = 5000;
app.use(cors());

app.use(express.json());

app.use('/characters', charactersRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});