import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMe } from '../profileActions';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.profile);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      console.log('fetching me with token:', accessToken);
      dispatch(fetchMe());
    }
  }, [dispatch, accessToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return (
    <ul>
      <li>Username: {user.username}</li>
      <li>Email: {user.email}</li>
      <li>Native Language: {user.native_language}</li>
      <li>Credits: {user.credits}</li>
      <li>
        Learning:
        <ul>
          {user.learning_languages.map((l) => (
            <li key={l.language}>
              {l.language} — {l.level}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default Profile;
