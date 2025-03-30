import RegisterForm from '@/components/Register/Register';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/footer';

export default function RegisterPage() {
  return (
    <div className="page">
      <Navigation />
      <RegisterForm />
      <Footer />
    </div>
  );
}
