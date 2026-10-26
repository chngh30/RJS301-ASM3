import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LiveChat from '../LiveChat/LiveChat';

const Layout = () => {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <LiveChat />
    </>
  );
};

export default Layout;
