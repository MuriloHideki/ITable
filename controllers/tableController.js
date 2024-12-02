const Table = require('../models/Table');
const db = require('../config/firebase');

const createTable = async (req, res) => {
  try {
    const { restaurant, number, capacity} = req.body;

    if (!restaurant || !number || !capacity) {
      return res.status(400).json({ message: 'Restaurant, Number, and Capacity fields are required' });
    }

    const newTable = { restaurant, number, capacity };

    const tableRef = db.ref('tables').push();
    await tableRef.set(newTable);

    res.status(201).json({ id: tableRef.id, ...newTable });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTables = async (req, res) => {
  try {
    const snapshot = await db.ref('tables').once('value');
    const tables = snapshot.val();

    if (tables) {
      const tablesArray = Object.entries(tables).map(([id, table]) => ({ id, ...table }));
      res.status(200).json({ status: 'success', data: { tables: tablesArray } });
    } else {
      res.status(200).json({ status: 'success', data: { tables: [] } });
    }
  } catch (err) {
    console.error('Error fetching tables:', err);
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).send({ error: 'Table not found' });
    }
    res.status(200).send(table);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getTablesByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const tables = await Table.find({ restaurant: restaurantId });

    if (tables.length === 0) {
      return res.status(404).json({ status: 'fail', message: 'No tables found for this restaurant' });
    }

    res.status(200).json({ status: 'success', data: { tables } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const updateTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!table) {
      return res.status(404).send({ error: 'Table not found' });
    }

    res.status(200).send(table);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const deleteTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    if (!table) {
      return res.status(404).send({ error: 'Table not found' });
    }
    res.status(200).send({ message: 'Table deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createTable,
  getAllTables,
  getTableById,
  getTablesByRestaurant,
  updateTable,
  deleteTable
};
