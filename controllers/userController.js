const User = require('../models/User');
const admin = require('../config/firebase');

const createClient = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userType = 'Client';

    if (!name) {
      return res.status(400).json({ message: 'Name field is required' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email field is required' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password field is required' });
    }

    const newUser = new User({ name, email, password, userType });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createRestaurant = async (req, res) => {
  try {
    const { name, email, password, cookingType, address } = req.body;
    const userType = 'Restaurant';

    if (!name) {
      return res.status(400).json({ message: 'Name field is required' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email field is required' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password field is required' });
    }
    if (!address) {
      return res.status(400).json({ message: 'Address field is required' });
    }

    const newUser = new User({ name, email, password, userType, cookingType, address });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: 'success', data: { users } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await User.find({ userType: 'Restaurant' });
    res.status(200).json({ status: 'success', data: { restaurants } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const getRestaurantsByCuisine = async (req, res) => {
  try {
    const { cuisineType } = req.params;
    const restaurants = await User.find({ userType: 'Restaurant', cuisineType });

    if (restaurants.length === 0) {
      return res.status(404).json({ status: 'fail', message: `No restaurant of type ${cuisineType} found` });
    }

    res.status(200).json({ status: 'success', data: { restaurants } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createClient,
  createRestaurant,
  getUser,
  getUserById,
  getRestaurants,
  getRestaurantsByCuisine,
  updateUser,
  deleteUser
};
