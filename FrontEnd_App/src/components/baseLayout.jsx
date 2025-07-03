import HeaderTopBar from './headerTopBar';
import MainNavbar    from './mainNavbar';
import Footer        from './footer.jsx';

export default function Layout({ children }) {
  return (
    <div className="bg-white">
      <HeaderTopBar />
      <MainNavbar />
      {children}
      <Footer />
    </div>
  );
}
