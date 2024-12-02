const db = require('../config/firebase');

const createReservation = async (req, res) => {
  try {
    const { table, customer, dateTime, numberOfPeople, status } = req.body;

    if (!table || !customer || !dateTime || !numberOfPeople) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    const tableSnapshot = await db.ref(`tables/${table}`).once('value');
    const tableToReserve = tableSnapshot.val();

    if (!tableToReserve) {
      return res.status(404).json({ message: 'Mesa não encontrada' });
    }

    if (tableToReserve.status !== 'Available') {
      return res.status(400).json({ message: 'A mesa não está disponível para reserva' });
    }

    if (tableToReserve.numberOfPeople < numberOfPeople) {
      return res.status(400).json({ message: `A mesa não comporta ${numberOfPeople} lugares` });
    }

    const newReservationRef = db.ref('reservations').push();
    const newReservation = {
      id: newReservationRef.key,
      table,
      customer,
      restaurantName,
      dateTime,
      numberOfPeople,
      orderNumber,
      status: status || 'Pending',
    };

    await newReservationRef.set(newReservation);

    await db.ref(`tables/${table}/status`).set('Reserved');

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const snapshot = await db.ref('reservations').once('value');
    const reservations = snapshot.val();

    if (reservations) {
      const reservationsArray = Object.entries(reservations).map(([id, reservation]) => ({ id, ...reservation }));
      res.status(200).json({ status: 'success', data: { reservations: reservationsArray } });
    } else {
      res.status(200).json({ status: 'success', data: { reservations: [] } });
    }
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

const getReservationById = async (req, res) => {
  try {
    const snapshot = await db.ref(`reservations/${req.params.id}`).once('value');
    const reservation = snapshot.val();

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }

    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const reservationRef = db.ref(`reservations/${req.params.id}`);
    const snapshot = await reservationRef.once('value');
    const reservation = snapshot.val();

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }

    if (req.body.numberOfPeople && reservation.table) {
      const tableSnapshot = await db.ref(`tables/${reservation.table}`).once('value');
      const tableToReserve = tableSnapshot.val();

      if (tableToReserve && tableToReserve.numberOfPeople < req.body.numberOfPeople) {
        return res.status(400).json({ message: `A mesa não comporta ${req.body.numberOfPeople} lugares` });
      }
    }

    await reservationRef.update(req.body);
    const updatedReservation = (await reservationRef.once('value')).val();

    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservationRef = db.ref(`reservations/${req.params.id}`);
    const snapshot = await reservationRef.once('value');
    const reservation = snapshot.val();

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }

    await reservationRef.remove();

    if (reservation.table) {
      await db.ref(`tables/${reservation.table}/status`).set('Available');
    }

    res.status(200).json({ message: 'Reserva deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
