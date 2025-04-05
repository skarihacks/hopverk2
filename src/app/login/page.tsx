import Footer from "@/components/Footer/footer";
import LoginForm from "@/components/Login/Login";
import Navigation from "@/components/Navigation/Navigation";


export default function LoginPage() {
  return (
    <div className="page">
        <Navigation/>
        <LoginForm />
        <Footer/>
    </div>
  );
}
