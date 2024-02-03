import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../redux/actions/userActions';

const VerifyUserPage = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(verifyEmail(token));
  }, [token, dispatch]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            Loading...
          </div>
        ) : error ? (
          <div style={{ color: '#FF0000', textAlign: 'center' }}>
            Error: {error}
          </div>
        ) : (
          <div style={{ color: '#008000', textAlign: 'center' }}>
            <div>Email Verified</div>
            <div>Your email has been successfully verified.</div>
            <div style={{ marginTop: '10px' }}>
              You can now <a href="/login" style={{ color: '#00f' }}>login</a> to your account.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyUserPage;
