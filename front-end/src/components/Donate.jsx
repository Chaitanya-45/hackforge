import React from 'react';
import { Link } from 'react-router-dom';
import './Donate.css';
import meddon from "../assets/meddon.avif";
import blooddon from "../assets/blooddon.webp";

function Donate() {
  return (
    <>
      <section className="dheader">
        <div className="dtext-box">
          <h1>
            Fostering Hope: Join Us in Making a Difference Through Donation
          </h1>
        </div>
      </section>
      <section id="donations" className="donations">
        <div className="dcontainer">

        <div className="row mb-10">
  <div className="col-lg-12 d-flex align-items-stretch" data-aos="fade-up">
    <div className="dcard flex-row">
      <div className="dcard-body flex-grow-1">
        <h5 className="dcard-title">First Aid Volunteer</h5>
        <p className="dcard-text">
          Be a hero in emergencies by joining our network of First Aid volunteers. When someone needs urgent assistance, such as CPR, and the ambulance might be delayed, you can make a critical difference. Our system sends out notifications to nearby volunteers, providing them with incident details and real-time coordinates. If your estimated time of arrival is faster than the ambulance, you'll receive an alert to provide immediate help. By responding to these alerts, you’ll not only assist those in need but also help ensure timely and effective emergency care.
          <br /><br />
          <strong>Join Us:</strong>
          <ul>
            <li><strong>Register:</strong> Sign up to become a volunteer and be part of our network.</li>
            <li><strong>Be Prepared:</strong> Ensure you're ready to respond and provide first aid effectively.</li>
            <li><strong>Make a Difference:</strong> Help save lives and support your community in emergency situations.</li>
          </ul>
        </p>
        <Link to="/Volform" className="btn btn-primary">Join as a Volunteer</Link>
      </div>
      <img src="../imgs/vol.avif" className="dcard-img-right" alt="First Aid Volunteer" style={{ width: '50%', objectFit: 'cover' }}/>
    </div>
  </div>
</div>


          <div className="row mb-10">
            <div className="col-lg-12 d-flex align-items-stretch" data-aos="fade-up">
              <div className="dcard flex-row">
                <div className="dcard-body flex-grow-1">
                  <h5 className="dcard-title">Medicine Donation</h5>
                  <p className="dcard-text">
                    Help make a difference in someone's life by donating unused medicines.
                    <br /><br />
                    <strong>What can you donate?</strong>
                    <ul>
                      <li>Pain relievers (e.g., ibuprofen, acetaminophen)</li>
                      <li>Antibiotics</li>
                      <li>Antihistamines</li>
                      <li>Vitamins and supplements</li>
                      <li>Prescription medications</li>
                    </ul>
                    <br />
                    <strong>Conditions for Donation:</strong>
                    <ul>
                      <li><strong>Unexpired:</strong> Ensure that the medicines have not expired.</li>
                      <li><strong>Quantity:</strong> While every donation counts, we encourage donations of full unopened packages or bottles.</li>
                      <li><strong>Prescription Medications:</strong> Prescription medications should be donated with the original prescription label intact.</li>
                    </ul>
                  </p>
                  <Link to ="/MedForm" className="btn btn-primary">Donate Now</Link>
                </div>
                <img src={meddon} className="dcard-img-right" alt="Medicine Donation" style={{ width: '35%', objectFit: 'cover' }}/>
              </div>
            </div>
          </div>
          <div className="row mb-4">
           <div className="col-lg-12 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
             <div className="dcard flex-row">
               <div className="dcard-body flex-grow-1">
                 <h5 className="dcard-title">Medical Equipment Donation</h5>
                 <p className="dcard-text">
                   Support healthcare facilities and accessibility by donating medical equipment such as wheelchairs, nebulizers, etc. Your donation can make a significant difference in improving healthcare services.
                   <br /><br />
                   <strong>What can you donate?</strong>
                   <ul>
                     <li>Wheelchairs</li>
                     <li>Crutches</li>
                     <li>Nebulizers</li>
                     <li>Hospital beds</li>
                     <li>Medical monitors</li>
                     <li>Walking aids (e.g., canes, walkers)</li>
                   </ul>
                   <br /><br />
                   <strong>Conditions for Donation:</strong>
                   <ul>
                     <li><strong>Functional:</strong> Ensure that the equipment is in working condition and suitable for use.</li>
                     <li><strong>Clean and Sanitized:</strong> Thoroughly clean and sanitize the equipment before donation to maintain hygiene standards.</li>
                     <li><strong>Complete:</strong> Donate equipment with all necessary accessories and components.</li>
                     <li><strong>Good Condition:</strong> Donate equipment that is in good condition without significant damage or wear.</li>
                     <li><strong>Safe:</strong> Ensure that donated equipment meets safety standards and does not pose any hazards to users.</li>
                   </ul>
                 </p>
                 <Link to ="/MedEquipment" className="btn btn-primary">Donate Now</Link>
               </div>
               <img src="../imgs/medequip.jpg" className="dcard-img-right" alt="Medical Equipment Donation" style={{ height: '20%', objectFit: 'cover' }}/>
             </div>
           </div>
         </div>
         <div className="row mb-4">
           <div className="col-lg-12 d-flex align-items-stretch" data-aos="fade-up">
             <div className="dcard flex-row">
               <div className="dcard-body flex-grow-1">
                 <h5 className="dcard-title">Blood Donation</h5>
                 <p className="dcard-text">
                   Make a life-saving difference by donating blood. Your blood donation can provide critical support to patients in need, particularly those undergoing surgeries, facing medical emergencies, or living with chronic conditions.
                   <br /><br />
                   <strong>Conditions for Donation:</strong>
                   <ul>
                     <li><strong>Health Status:</strong> Donors should be in good health and free from any illnesses or infections at the time of donation.</li>
                     <li><strong>Age:</strong> Donors must typically be between the ages of 18 and 65, although age requirements may vary by location.</li>
                     <li><strong>Identification:</strong> Donors are typically required to provide a valid form of identification</li>
                   </ul> </p>
                   <Link to ="/BloodDonation" className="btn btn-primary">Donate Now</Link>
               </div>
               <img src={blooddon} className="dcard-img-right" alt="Blood Donation" style={{ width: '40%', objectFit: 'cover' }}/>
             </div>
           </div>
         </div>
       </div>
     </section>
    </>
   )
}
export default Donate;

