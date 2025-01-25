import React, { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';

function Admin() {
  const [donations, setDonations] = useState({
    medicine: [],
    equipment: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonations = (type) => {
      const ref = database.ref(`${type}Donations`);
      ref.on(
        'value',
        (snapshot) => {
          const data = snapshot.val();
          setDonations((prev) => ({
            ...prev,
            [type]: data
              ? Object.entries(data).map(([id, details]) => ({
                  id,
                  ...details
                }))
              : []
          }));
        },
        (error) => {
          console.error(`Error fetching ${type} donations:`, error);
          setError(`Failed to fetch ${type} donations.`);
        }
      );

      return () => ref.off();
    };

    const types = ['medicine', 'equipment'];
    types.forEach(fetchDonations);

    return () => types.forEach((type) => database.ref(`${type}Donations`).off());
  }, []);

  const handleStatusChange = async (type, id, newStatus) => {
    setLoading(true);
    try {
      await database.ref(`${type}Donations/${id}`).update({ status: newStatus });
      setDonations((prev) => ({
        ...prev,
        [type]: prev[type].map((donation) =>
          donation.id === id ? { ...donation, status: newStatus } : donation
        )
      }));
    } catch (error) {
      console.error(`Error updating ${type} status:`, error);
      setError(`Failed to update ${type} status.`);
    } finally {
      setLoading(false);
    }
  };

  const renderDonations = (type, title) => (
    <div style={styles.donationsContainer}>
      <h3 style={styles.header}>{title}</h3>
      {donations[type].length === 0 ? (
        <p>No {title.toLowerCase()} available.</p>
      ) : (
        <div style={styles.donationsList}>
          {donations[type].map((donation) => (
            <div key={donation.id} style={styles.donationCard}>
              <p>
                <strong>Item Name:</strong> {donation.medicineName || donation.equipmentName}
              </p>
              <p>
                <strong>Quantity:</strong> {donation.quantity}
              </p>
              <p>
                <strong>Time:</strong> {donation.donationTime}
              </p>
              <p>
                <strong>Status:</strong> {donation.status}
              </p>
              <select
                value={donation.status}
                onChange={(e) => handleStatusChange(type, donation.id, e.target.value)}
                disabled={loading}
                style={styles.select}
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Admin Dashboard</h2>

      {error && <p style={styles.errorMessage}>{error}</p>}

      {renderDonations('medicine', 'Medicine Donations')}
      {renderDonations('equipment', 'Equipment Donations')}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
  },
  pageTitle: {
    color: '#333',
    marginTop: '20px',
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  donationsContainer: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    fontSize: '1.5em',
    marginBottom: '15px',
    color: '#555',
  },
  donationsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  donationCard: {
    backgroundColor: '#fff',
    padding: '15px',
    width: '250px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
  },
  donationCardHover: {
    transform: 'scale(1.05)',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    fontSize: '14px',
  },
};

export default Admin;
