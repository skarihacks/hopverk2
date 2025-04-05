import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/footer';
import EditArticleForm from '@/components/EditArticle/EditArticle';
import { QuestionsApi } from '@/api';

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  const id = parseInt(articleId, 10);

  const api = new QuestionsApi();
  const article = await api.getArticleById(id);

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
