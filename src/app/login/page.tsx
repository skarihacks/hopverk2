import Footer from "@/components/Footer/footer";
import LoginForm from "@/components/Login/Login";
import Navigation from "@/components/Navigation/Navigation";
import { register } from "module";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="page">
        <Navigation/>
        <LoginForm />
        <p>
        Don't have an account? <Link href="/register">Register here</Link>
      </p>
        <Footer/>
    </div>
  );
}
