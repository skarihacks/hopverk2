
import Footer from '@/components/Footer/footer';
import Navigation from '@/components/Navigation/Navigation';
import { ArticleView } from '@/components/Article/Article';
import MakeComment from '@/components/MakeComment/MakeComment';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: number }>;
}) {
  const { articleId }= await params;

  if (isNaN(articleId)) {
    return (
      <div className="page">
        <Navigation />
        <p>Invalid article ID</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navigation />
      <ArticleView id={articleId} />
      <Footer />
    </div>
  );
}
