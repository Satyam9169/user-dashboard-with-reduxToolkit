import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../Firebase/Firebase';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h2 className="card-title">User Information</h2>
        {userData ? (
          <>
            <p><strong>First Name:</strong> {userData.firstName || "First Name not available"}</p>
            <p><strong>Last Name:</strong> {userData.lastName || "Last Name not available"}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Mobile:</strong> {userData.mobile || "Mobile not available"}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>City:</strong> {userData.city}</p>
            <p><strong>State:</strong> {userData.state}</p>
            <p><strong>Country:</strong> {userData.country}</p>
            <p><strong>Pincode:</strong> {userData.pincode}</p>
          </>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
