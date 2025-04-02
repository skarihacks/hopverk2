import Footer from "@/components/Footer/footer";
import Navigation from "@/components/Navigation/Navigation";


export default function Home() {
  return (
    <div className="page">
      <Navigation />

      <section className="welcome">
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
          alt="Hlýleg mynd"
          className="welcome-image"
        />
        <h1>SælirKælir</h1>
        <p>
          Hæ og verið hjartanlega velkomin á bloggsíðuna <strong>SælirKælir</strong>!<br />
          Hér getur þú tjáð þig, deilt skoðunum þínum og notið þess að vera partur af hressu samfélagi.<br />
          Kælt en kært!
        </p>
      </section>

      <Footer />
    </div>
  );
}

