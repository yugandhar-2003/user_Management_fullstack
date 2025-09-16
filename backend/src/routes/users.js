const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET /api/users - list all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({ order: [['id', 'ASC']] });
    res.json(users);
  } catch (err) { next(err); }
});

// GET /api/users/:id - get user by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
});

// POST /api/users - create user
router.post('/', async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload.name || !payload.email) {
      return res.status(400).json({ error: 'name and email are required' });
    }
    const newUser = await User.create({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      website: payload.website || null,
      companyName: payload.company?.name || payload.companyName || null,
      companyCatchPhrase: payload.company?.catchPhrase || null,
      addressStreet: payload.address?.street || null,
      addressCity: payload.address?.city || null,
      addressZipcode: payload.address?.zipcode || null,
      geoLat: payload.address?.geo?.lat || null,
      geoLng: payload.address?.geo?.lng || null,
    });
    res.status(201).json(newUser);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    next(err);
  }
});

// PUT /api/users/:id - update user
router.put('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const payload = req.body;
    await user.update({
      name: payload.name ?? user.name,
      email: payload.email ?? user.email,
      phone: payload.phone ?? user.phone,
      website: payload.website ?? user.website,
      companyName: payload.company?.name ?? payload.companyName ?? user.companyName,
      companyCatchPhrase: payload.company?.catchPhrase ?? user.companyCatchPhrase,
      addressStreet: payload.address?.street ?? user.addressStreet,
      addressCity: payload.address?.city ?? user.addressCity,
      addressZipcode: payload.address?.zipcode ?? user.addressZipcode,
      geoLat: payload.address?.geo?.lat ?? user.geoLat,
      geoLng: payload.address?.geo?.lng ?? user.geoLng,
    });
    res.json(user);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    next(err);
  }
});

// DELETE /api/users/:id - delete user
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.status(204).end();
  } catch (err) { next(err); }
});

module.exports = router;