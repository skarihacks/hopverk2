import CategoryArticles from '@/components/CategoryArticles/CategoryArticles';
import TagArticles from '@/components/TagArticles/TagArticles';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/footer';



export default async function BrowsePage({ params }: { params: Promise<{ type: string, id: string }> }) {
  const { type, id } = await params;

  if (!type || !id) {
    return <p>Invalid route</p>;
  }

  if (type === 'category') {
    const categoryId = parseInt(id);
    if (isNaN(categoryId)) {
      return <p>Invalid category ID</p>;
    }
    return (
      <div className='page'>
        <Navigation/>
        <h1>Category: {categoryId}</h1>
        <CategoryArticles categoryId={categoryId} />
        <Footer/>
      </div>

    );
  }

  if (type === 'tag') {
    return (
      <div className='page'>
        <Navigation/>
        <h1>Tag: {id}</h1>
        <TagArticles tagName={id} />
        <Footer/>
      </div>
    );
  }

  return <p>Invalid browse type</p>;
}

