import Categories from '@/components/Categories/Categories';
import Footer from '@/components/Footer/footer';
import Navigation from '@/components/Navigation/Navigation';

export default function Home() {
  return (
    <div className='page'>
      <Navigation />
      <Categories title="Allir flokkar" />
      <Footer/>
    </div>
  );
}
