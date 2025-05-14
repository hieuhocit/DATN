// Components
import Introduction from "@/components/home/Introduction";
import Recommendation from "@/components/home/Recommendation";
import Popular from "@/components/home/Popular";
import Newest from "@/components/home/Newest";
import Footer from "@/components/home/Footer";
import { useAppSelector } from "@/hooks/useStore";
import {
  enrollmentsSelector,
  isLoggedInSelector,
  userSelector,
} from "@/features/account";

export default function Home() {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const user = useAppSelector(userSelector);
  const enrollments = useAppSelector(enrollmentsSelector);

  return (
    <>
      <Introduction />
      {isLoggedIn && user?.role !== "admin" && enrollments.length > 0 && (
        <Recommendation />
      )}
      <Popular />
      <Newest />
      <Footer />
    </>
  );
}
