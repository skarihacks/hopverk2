import { QuestionsApi } from '@/api';
import EditArticleForm from '@/components/EditArticle/EditArticle';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/footer';

export default async function EditArticlePage({ params }: { params: { articleId: string } }) {
  const articleId = parseInt(params.articleId);
  const api = new QuestionsApi();
  const article = await api.getArticleById(articleId);

  if (!article) {
    return (
      <div className="page">
        <Navigation />
        <p>Article not found</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navigation />
      <EditArticleForm article={article} />
      <Footer />
    </div>
  );
}
