import Footer from '@/components/Footer/footer';
import Navigation from '@/components/Navigation/Navigation';
import UserProfile from '@/components/UserProfile/UserProfile';

export default function UserProfilePage() {
  return (
    <div className="page">
      <Navigation />
      <UserProfile />
      <Footer />
    </div>
  );
}
