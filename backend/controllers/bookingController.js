import prisma from "../config/db.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, date } = req.body;
    const booking = await prisma.booking.create({
      data: { name, email, phone, date: new Date(date) },
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update booking status
export const updateBooking = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    await prisma.booking.delete({ where: { id: req.params.id } });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
