import Articles from '@/components/Articles/Articles';
import Footer from '@/components/Footer/footer';
import Navigation from '@/components/Navigation/Navigation';

export default function Home() {
  return (
    <div className='page'>
      <Navigation />
      <Articles title="All articles" />
      <Footer/>
    </div>
  );
}
