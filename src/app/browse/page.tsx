import CategoryList from '@/components/Categories/Categories';
import Footer from '@/components/Footer/footer';
import Navigation from '@/components/Navigation/Navigation';
import TagList from '@/components/TagList/TagList';

export default function HomePage() {
  return (
    <div className='page'>
      <Navigation/>
      <CategoryList />
      <TagList/>
      <Footer/>
    </div>
  );
}



