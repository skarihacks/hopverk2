import { Category } from '@/components/Category/Category';
import Footer from '@/components/Footer/footer';
import Navigation from '@/components/Navigation/Navigation';

export default async function FlokkaPage({
  params,
}: {
  params: Promise<{ flokkur: string }>;
}) {
  const { flokkur } = await params;

  return (
    <div className='page'>
      <Navigation />
      <Category slug={flokkur} />
      <Footer/>
    </div>
  );
}
