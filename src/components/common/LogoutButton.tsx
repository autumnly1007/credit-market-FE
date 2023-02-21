import axios from 'axios';
import Button from './Button';

type Props = {};

const LogoutButton = (props: Props) => {
  const handleLogout = async () => {
    try {
      const response = await axios.post('api/logout');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleLogout}> Logout </Button>;
};

export default LogoutButton;