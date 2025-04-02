import Dashboard from '@/components/Dashboard/Dashboard';
import Footer from '@/components/Footer/footer';
import Navigation from '@/components/Navigation/Navigation';

export default function HomePage() {
  return (
    <div>
      <Navigation/>
        <Dashboard/>
      <Footer/>
    </div>
  );
}

