// Components
import Introduction from "@/components/home/Introduction";
import Recommendation from "@/components/home/Recommendation";
import Popular from "@/components/home/Popular";
import Newest from "@/components/home/Newest";
import Footer from "@/components/home/Footer";
import { useAppSelector } from "@/hooks/useStore";
import { isLoggedInSelector } from "@/features/account";

export default function Home() {
  const isLoggedIn = useAppSelector(isLoggedInSelector);

  return (
    <>
      <Introduction />
      {isLoggedIn && <Recommendation />}
      <Popular />
      <Newest />
      <Footer />
    </>
  );
}
