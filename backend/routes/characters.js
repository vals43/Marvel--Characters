import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const dataPath = path.join(process.cwd(), 'data', 'user.json');

function readData() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET all characters
router.get('/', (req, res) => {
  const data = readData();
  res.json(data.characters);
});

// GET character by ID
router.get('/:id', (req, res) => {
  const data = readData();
  const character = data.characters.find(c => c.id === parseInt(req.params.id));
  if (!character) return res.status(404).json({ message: 'Character not found' });
  res.json(character);
});

// POST add character
router.post('/', (req, res) => {
  const data = readData();
  const newCharacter = { id: Date.now(), ...req.body };
  data.characters.push(newCharacter);
  writeData(data);
  res.status(201).json(newCharacter);
});

// PUT update character
router.put('/:id', (req, res) => {
  const data = readData();
  const index = data.characters.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Character not found' });

  data.characters[index] = { ...data.characters[index], ...req.body };
  writeData(data);
  res.json(data.characters[index]);
});

// DELETE character
router.delete('/:id', (req, res) => {
  const data = readData();
  const newCharacters = data.characters.filter(c => c.id !== parseInt(req.params.id));
  if (newCharacters.length === data.characters.length) return res.status(404).json({ message: 'Character not found' });

  data.characters = newCharacters;
  writeData(data);
  res.json({ message: 'Character deleted' });
});

export default router;