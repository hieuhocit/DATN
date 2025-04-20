// Components
import Introduction from '@/components/home/Introduction';
import Recommendation from '@/components/home/Recommendation';
import Popular from '@/components/home/Popular';
import Newest from '@/components/home/Newest';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <>
      <Introduction />
      <Recommendation />
      <Popular />
      <Newest />
      <Footer />
    </>
  );
}
