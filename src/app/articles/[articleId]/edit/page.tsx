import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/footer';
import EditArticleForm from '@/components/EditArticle/EditArticle'; // name change

export default function EditArticlePage({ params }: { params: { articleId: string } }) {
  const articleId = parseInt(params.articleId, 10);

  return (
    <div className="page">
      <Navigation />
      <EditArticleForm articleId={articleId} />
      <Footer />
    </div>
  );
}
