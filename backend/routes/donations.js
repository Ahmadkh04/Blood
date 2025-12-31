import express from 'express';
import pool from '../config.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Schedule a donation
router.post('/schedule', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone, date, bloodType } = req.body;
    const userId = req.user.userId;

    // Validation
    if (!name || !email || !phone || !date || !bloodType) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Validate date is in the future
    const donationDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (donationDate < today) {
      return res.status(400).json({ 
        success: false, 
        message: 'Donation date must be in the future' 
      });
    }

    // Insert donation into database
    const [result] = await pool.execute(
      'INSERT INTO donations (user_id, name, email, phone, donation_date, blood_type) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, name, email, phone, date, bloodType]
    );

    res.status(201).json({
      success: true,
      message: 'Donation scheduled successfully',
      donation: {
        id: result.insertId,
        name,
        email,
        phone,
        date,
        bloodType,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Schedule donation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while scheduling donation' 
    });
  }
});

// Get user's donations
router.get('/my-donations', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const [donations] = await pool.execute(
      'SELECT id, name, email, phone, donation_date, blood_type, status, created_at FROM donations WHERE user_id = ? ORDER BY donation_date DESC',
      [userId]
    );

    res.json({
      success: true,
      donations
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching donations' 
    });
  }
});

// Get all donations (for admin - optional)
router.get('/all', authenticateToken, async (req, res) => {
  try {
    const [donations] = await pool.execute(
      `SELECT d.id, d.name, d.email, d.phone, d.donation_date, d.blood_type, d.status, d.created_at, u.name as user_name 
       FROM donations d 
       LEFT JOIN users u ON d.user_id = u.id 
       ORDER BY d.donation_date DESC`
    );

    res.json({
      success: true,
      donations
    });
  } catch (error) {
    console.error('Get all donations error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching donations' 
    });
  }
});

export default router;

