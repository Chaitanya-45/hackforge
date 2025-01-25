import React, { useEffect, useState } from 'react';
import { database } from '../firebase/firebase';
import './Emergency.css'; 

function Emergency() {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [medicalRegistrationNumber, setMedicalRegistrationNumber] = useState('');
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const volunteersRef = database.ref('volunteers');
        const snapshot = await volunteersRef.once('value');
        const data = snapshot.val();

        if (data) {
          const volunteerArray = Object.entries(data).map(([id, volunteer]) => ({ ...volunteer, id }));
          setVolunteers(volunteerArray);
          setFilteredVolunteers(volunteerArray); // Initialize filteredVolunteers
        } else {
          setVolunteers([]);
          setFilteredVolunteers([]);
        }
      } catch (error) {
        setError('Error fetching volunteers.');
        console.error('Error fetching volunteers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  useEffect(() => {
    // Filter volunteers based on the search query
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = volunteers.filter(volunteer =>
      volunteer.location.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredVolunteers(filtered);
  }, [searchQuery, volunteers]);

  const handleUpdateButtonClick = async () => {
    if (!medicalRegistrationNumber.trim()) {
      alert('Please enter a registration number.');
      return;
    }

    try {
      const volunteersRef = database.ref('volunteers');
      const snapshot = await volunteersRef.once('value');
      const data = snapshot.val();

      if (data) {
        const volunteerEntry = Object.entries(data).find(([id, volunteer]) => volunteer.medicalRegistrationNumber === medicalRegistrationNumber);

        if (volunteerEntry) {
          const [id, volunteerData] = volunteerEntry;
          const newLocation = prompt('Enter new location:', volunteerData.location);
          
          if (newLocation !== null && newLocation.trim()) {
            await volunteersRef.child(id).update({ location: newLocation.trim() });
            alert('Location updated successfully!');
            
            // Refresh volunteers list
            const updatedSnapshot = await volunteersRef.once('value');
            const updatedData = updatedSnapshot.val();
            const updatedVolunteerArray = updatedData ? Object.entries(updatedData).map(([id, volunteer]) => ({ ...volunteer, id })) : [];
            setVolunteers(updatedVolunteerArray);
            setFilteredVolunteers(updatedVolunteerArray);
          }
        } else {
          alert('Registration number not found.');
        }
      }
    } catch (error) {
      alert('Error updating location.');
      console.error('Error updating location:', error);
    } finally {
      setUpdateMode(false);
      setMedicalRegistrationNumber('');
      setNewLocation('');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="volunteers">
      <h1 style={{ textAlign: 'center' }}>List of Volunteers</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by location..."
          style={{
            width: '50%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            boxSizing: 'border-box',
            fontSize: '16px',
            marginRight: '10px',
          }}
        />
        <button onClick={() => setUpdateMode(true)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#4CAF50', color: 'white' }}>
          Update Location
        </button>
      </div>

      {updateMode && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            value={medicalRegistrationNumber}
            onChange={(e) => setMedicalRegistrationNumber(e.target.value)}
            placeholder="Enter registration number..."
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              boxSizing: 'border-box',
              fontSize: '16px',
              marginRight: '10px',
            }}
          />
          <button onClick={handleUpdateButtonClick} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#4CAF50', color: 'white' }}>
            Submit
          </button>
          <button onClick={() => setUpdateMode(false)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f44336', color: 'white', marginLeft: '10px' }}>
            Cancel
          </button>
        </div>
      )}

      <table className="volunteers-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredVolunteers.length > 0 ? (
            filteredVolunteers.map((volunteer, index) => (
              <tr key={volunteer.id}>
                <td>{index + 1}</td>
                <td>{volunteer.name}</td>
                <td>{volunteer.contact}</td>
                <td>{volunteer.location}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No volunteers available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Emergency;
