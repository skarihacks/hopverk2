import NewArticleForm from '@/components/NewArticle/NewArticle';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/footer';

export default function WriteArticlePage() {
  return (
    <div className="page">
      <Navigation />
      <NewArticleForm />
      <Footer />
    </div>
  );
}
