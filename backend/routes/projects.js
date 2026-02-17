import express from 'express';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects (optional featured filter)
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = featured === 'true' ? { featured: true } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/projects
// @desc    Create project (protected)
router.post('/', protect, async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      userId: req.user._id
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
