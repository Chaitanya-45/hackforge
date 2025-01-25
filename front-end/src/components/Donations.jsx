import React, { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import "./Donations.css";
import Questionnaire from "./Questionnaire";
import Modal from "react-modal";
import medicine from "../assets/medicine.jpg";
import equipment from "../assets/equipment.jpg";
import blood from "../assets/blood.jpg";


Modal.setAppElement("#root");

function Donations() {
  const [medicineDonations, setMedicineDonations] = useState([]);
  const [equipmentDonations, setEquipmentDonations] = useState([]);
  const [bloodDonations, setBloodDonations] = useState([]);

  const [medicineIndex, setMedicineIndex] = useState({});
  const [equipmentIndex, setEquipmentIndex] = useState({});
  const [bloodIndex, setBloodIndex] = useState({});

  const [hospitalData, setHospitalData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [restrictedMedicineEmail, setRestrictedMedicineEmail] = useState(null);
  const [restrictedMedicineName, setRestrictedMedicineName] = useState("");

  const restrictedMedicines = [
    "Adderall",
    "Ritalin",
    "Ambien",
    "Sonata",
    "Warfarin",
    "Heparin",
    "Risperdal",
    "Seroquel",
    "Abilify",
    "Lunesta",
    "Concerta",
  ];

  const sampleHospitalData = [
    {
      name: "Osmania Hospital",
      location: "Hyderabad",
      contact: "040-24630111",
    },
    {
      name: "Gandhi Hospital",
      location: "Secunderabad",
      contact: "040-27806650",
    },
    {
      name: "King Koti Hospital",
      location: "Hyderabad",
      contact: "040-24752010",
    },
    {
      name: "Niloufer Hospital",
      location: "Hyderabad",
      contact: "040-27514877",
    },
  ];

  useEffect(() => {
    setHospitalData(sampleHospitalData);
  }, []);

  const tokenize = (text) => {
    return text.toLowerCase().split(/\s+/).filter(Boolean);
  };

  const buildInvertedIndex = (donations, fields) => {
    const index = {};
    donations.forEach((donation, idx) => {
      fields.forEach((field) => {
        if (donation[field]) {
          const tokens = tokenize(donation[field]);
          tokens.forEach((token) => {
            if (!index[token]) {
              index[token] = new Set();
            }
            index[token].add(idx);
          });
        }
      });
    });
    return index;
  };

  useEffect(() => {
    const fetchMedicineDonations = async () => {
      try {
        const medicineDonationsRef = database.ref("medicineDonations");
        const snapshot = await medicineDonationsRef.once("value");
        const data = snapshot.val();

        if (data) {
          const donationArray = Object.values(data).filter(
            (donation) => donation.status === "accepted"
          );
          setMedicineDonations(donationArray);
          console.log("Medicine Donations (Accepted):", donationArray);

          const index = buildInvertedIndex(donationArray, [
            "medicineName",
            "location",
          ]);
          setMedicineIndex(index);
          console.log("Medicine Inverted Index:", index);
        }
      } catch (error) {
        console.error("Error fetching medicine donations:", error);
      }
    };

    const fetchEquipmentDonations = async () => {
      try {
        const equipmentDonationsRef = database.ref("equipmentDonations");
        const snapshot = await equipmentDonationsRef.once("value");
        const data = snapshot.val();

        if (data) {
          const donationArray = Object.values(data).filter(
            (donation) => donation.status === "accepted"
          );
          setEquipmentDonations(donationArray);

          const index = buildInvertedIndex(donationArray, [
            "equipmentName",
            "location",
          ]);
          setEquipmentIndex(index);
        }
      } catch (error) {
        console.error("Error fetching equipment donations:", error);
      }
    };

    const fetchBloodDonations = async () => {
      try {
        const bloodDonationsRef = database.ref("bloodDonations");
        const snapshot = await bloodDonationsRef.once("value");
        const data = snapshot.val();

        if (data) {
          const donationArray = Object.values(data);
          setBloodDonations(donationArray);
          console.log("Blood Donations:", donationArray); 
          const index = buildInvertedIndex(donationArray, [
            "bloodType",
            "location",
          ]);
          setBloodIndex(index);
          console.log("Blood Inverted Index:", index); 
        }
      } catch (error) {
        console.error("Error fetching blood donations:", error);
      }
    };

    fetchMedicineDonations();
    fetchEquipmentDonations();
    fetchBloodDonations();
  }, []);

  // const searchDonations = () => {
  //   if (!searchQuery.trim()) {
  //     return {
  //       medicine: medicineDonations,
  //       equipment: equipmentDonations,
  //       blood: bloodDonations,
  //     };
  //   }

  //   const tokens = tokenize(searchQuery);
  //   let medicineMatches = null;
  //   let equipmentMatches = null;
  //   let bloodMatches = null;

  //   tokens.forEach((token) => {
  //     const ids = medicineIndex[token];
  //     if (ids) {
  //       if (medicineMatches === null) {
  //         medicineMatches = new Set(ids);
  //       } else {
  //         medicineMatches = new Set(
  //           [...medicineMatches].filter((id) => ids.has(id))
  //         );
  //       }
  //     } else {
  //       medicineMatches = new Set();
  //     }
  //   });

  //   tokens.forEach((token) => {
  //     const ids = equipmentIndex[token];
  //     if (ids) {
  //       if (equipmentMatches === null) {
  //         equipmentMatches = new Set(ids);
  //       } else {
  //         equipmentMatches = new Set(
  //           [...equipmentMatches].filter((id) => ids.has(id))
  //         );
  //       }
  //     } else {
  //       equipmentMatches = new Set();
  //     }
  //   });

  //   tokens.forEach((token) => {
  //     const ids = bloodIndex[token];
  //     if (ids) {
  //       if (bloodMatches === null) {
  //         bloodMatches = new Set(ids);
  //       } else {
  //         bloodMatches = new Set([...bloodMatches].filter((id) => ids.has(id)));
  //       }
  //     } else {
  //       bloodMatches = new Set();
  //     }
  //   });

  //   const filteredMedicineDonations = medicineMatches
  //     ? Array.from(medicineMatches).map((id) => medicineDonations[id])
  //     : [];

  //   const filteredEquipmentDonations = equipmentMatches
  //     ? Array.from(equipmentMatches).map((id) => equipmentDonations[id])
  //     : [];

  //   const filteredBloodDonations = bloodMatches
  //     ? Array.from(bloodMatches).map((id) => bloodDonations[id])
  //     : [];

  //   return {
  //     medicine: filteredMedicineDonations,
  //     equipment: filteredEquipmentDonations,
  //     blood: filteredBloodDonations,
  //   };
  // };

  const filterDonations = (donations, query, fields) => {
    if (!query.trim()) return donations;

    return donations.filter((donation) =>
      fields.some((field) =>
        donation[field]?.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const filteredMedicineDonations = filterDonations(
    medicineDonations,
    searchQuery,
    ["medicineName", "location"]
  );

  const filteredEquipmentDonations = filterDonations(
    equipmentDonations,
    searchQuery,
    ["equipmentName", "location"]
  );

  const filteredBloodDonations = filterDonations(
    bloodDonations,
    searchQuery,
    ["bloodType", "location"]
  );
  

  const handleContactHospital = (donationLocation) => {
    const matchedHospital = hospitalData.find(
      (hospital) =>
        hospital.location.toLowerCase() === donationLocation.toLowerCase()
    );
    if (matchedHospital) {
      setSelectedContact(matchedHospital.contact);
    } else {
      alert("No hospital found for this location");
      setSelectedContact(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Donations..."
        style={{
          marginTop: "40px",
          marginLeft: "35%",
          marginBottom: "10px",
          width: "35%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          boxSizing: "border-box",
          fontSize: "16px",
        }}
      />
      {/* Medicine Donations Section */}
      <section className="donsec">
        <h1 style={{ textAlign: "center" }}>Medicine Donations</h1>
        <div className="donation-card">
          {filteredMedicineDonations.map((donation, index) => (
            <div key={index} className="card">
              <img
              src={medicine}
              alt={donation.medicineName}
              style={{
                width: "100%",
                maxHeight: "150px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
              <h2>Medicine Name: {donation.medicineName}</h2>
              <p>Quantity: {donation.quantity}</p>
              <p>Location: {donation.location}</p>
              <p>Expiry Date: {donation.expiryDate}</p>
              {selectedContact && (
                <div className="contact-popup">
                  <p>Contact Number: {selectedContact}</p>
                  <button onClick={() => setSelectedContact(null)}>
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Equipment Donations Section */}
      <section className="donsec">
        <h1 style={{ textAlign: "center" }}>Equipment Donations</h1>
        <div className="donation-card">
          {filteredEquipmentDonations.map((donation, index) => (
            <div key={index} className="card">
              <img
              src={equipment}
              alt={donation.equipmentName}
              style={{
                width: "100%",
                maxHeight: "150px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
              <h2>Equipment Name: {donation.equipmentName}</h2>
              <p>Quantity: {donation.quantity}</p>
              <p>Location: {donation.location}</p>
              <p>Condition: {donation.condition}</p>
              {selectedContact && (
                <div className="contact-popup">
                  <p>Contact Number: {selectedContact}</p>
                  <button onClick={() => setSelectedContact(null)}>
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Blood Donations Section */}
      <section className="donsec">
        <h1 style={{ textAlign: "center" }}>Blood Donations</h1>
        <div className="donation-card">
          {filteredBloodDonations.map((donation, index) => (
            <div key={index} className="card">
              <img
              src={blood}
              alt={donation.bloodType}
              style={{
                width: "100%",
                maxHeight: "150px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
              <h2>Blood Type: {donation.bloodType}</h2>
              <p>Donor's Age: {donation.age}</p>
              <p>Location: {donation.location}</p>
              {selectedContact && (
                <div className="contact-popup">
                  <p>Contact Number: {selectedContact}</p>
                  <button onClick={() => setSelectedContact(null)}>
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Donations;
