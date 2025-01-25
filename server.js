const express = require('express');
const firebaseAdmin = require('firebase-admin');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const cron = require('node-cron');

const app = express();

const serviceAccount = require('./svasthmaitri-firebase-adminsdk.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://svasthmaitri-default-rtdb.firebaseio.com/',
});

app.use(express.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });

const createDonationHandler = (refPath) => (req, res) => {
  const db = firebaseAdmin.database();
  const ref = db.ref(refPath);
  const donationData = { ...req.body, status: req.body.status || 'pending', createdAt: Date.now() };

  ref
    .push(donationData)
    .then(() => res.status(201).json({ message: 'Donation submitted successfully.' }))
    .catch((error) => {
      console.error(`Error submitting donation to ${refPath}:`, error);
      res.status(500).json({ error: 'Failed to submit donation.' });
    });
};

app.post('/submit-medicine', createDonationHandler('medicineDonations'));
app.post('/submit-blood', createDonationHandler('bloodDonations'));
app.post('/submit-equipment', createDonationHandler('equipmentDonations'));

// Cron Job to Remove Outdated Donations
const removeOutdatedDonations = async () => {
  try {
    const db = firebaseAdmin.database();
    const donationTypes = ['medicineDonations', 'equipmentDonations', 'bloodDonations'];
    const cutoffTime = Date.now() -  30 * 1000; // 2 minutes ago

    for (const type of donationTypes) {
      const snapshot = await db.ref(type).once('value');
      const donations = snapshot.val();

      if (donations) {
        for (const [id, donation] of Object.entries(donations)) {
          const donationTime = donation.donationTime || 0;
          const createdAt = donation.createdAt || 0;
          if (donation.status === 'pending' && createdAt < cutoffTime) {
            await db.ref(`${type}/${id}`).remove();
            console.log(`Removed outdated donation: ${id} from ${type}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error removing outdated donations:', error);
  }
};

// Run cleanup job every minute (for testing)
cron.schedule('* * * * *', () => {
  console.log('Running cleanup job...');
  removeOutdatedDonations();
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


