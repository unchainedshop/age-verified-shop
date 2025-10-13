import { useState } from 'react';
import dynamic from 'next/dynamic';
import Footer from './Footer';
import Header from './Header';
import SidebarNavigation from './SidebarNavigation';
import SideCart from '../../cart/components/SideCart';
import { useAppContext } from '../../common/components/AppContextWrapper';
import useUser from '../../auth/hooks/useUser';
const AgeVerification = dynamic(() => import('./AgeVerification'), {
  ssr: false,
});

interface LayoutProps {
  children: React.ReactNode;
  hasHeroSection?: boolean;
  heroSectionId?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  hasHeroSection = false,
  heroSectionId = 'hero-section',
}) => {
  const { user, loading } = useUser();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isCartOpen } = useAppContext();

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Header
        onSidebarToggle={handleSidebarToggle}
        hasHeroSection={hasHeroSection}
        heroSectionId={heroSectionId}
      />
      <AgeVerification />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
      <SidebarNavigation isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <SideCart isOpen={isCartOpen} />
    </>
  );
};

export default Layout;
