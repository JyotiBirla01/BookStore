import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <AppRoutes user={user} />
    </BrowserRouter>
  );
};

export default App;
