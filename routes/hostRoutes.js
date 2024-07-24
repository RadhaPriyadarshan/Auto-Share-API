const express = require('express');
const Host = require('../models/host');

const router = express.Router();

// Get all hosts
router.get('/', async (req, res) => {
  try {
    const hosts = await Host.find();
    res.json(hosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new host
router.post('/', async (req, res) => {
  const host = new Host(req.body);
  try {
    const newHost = await host.save();
    res.status(201).json(newHost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a host
router.patch('/:id', async (req, res) => {
  try {
    const host = await Host.findById(req.params.id);
    if (host == null) return res.status(404).json({ message: 'Host not found' });

    Object.assign(host, req.body);
    const updatedHost = await host.save();
    res.json(updatedHost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a host
router.delete('/:id', async (req, res) => {
  try {
    const host = await Host.findById(req.params.id);
    if (host == null) return res.status(404).json({ message: 'Host not found' });

    await host.remove();
    res.json({ message: 'Host deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
