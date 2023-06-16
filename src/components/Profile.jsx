import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { auth, firestore } from '../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import "./Profile.css";



function Profile() {
  const [fullName, setFullName] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userDocRef = doc(collection(firestore, 'users'), user.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setFullName(userData.fullName);
          }
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className='form-container'>
      <h2>Welcome, {fullName}!</h2>
      <br/>
      <p>This is your profile page.</p>
      <br/>
      <p>
        Go back to <Link to="/login">Login</Link> page.
      </p>
      </div>
    </div>
  );
}

export default Profile;
