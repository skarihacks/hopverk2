import Footer from '@/components/Footer/footer';
import Navigation from '@/components/Navigation/Navigation';
import UserList from '@/components/UserList/UserList';

export default function UsersPage() {
  return (
    <div className="page">
      <Navigation />
      <UserList />
      <Footer />
    </div>
  );
}
