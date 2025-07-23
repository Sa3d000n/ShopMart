import styles from "./HomePage.module.css";
import IntroSection from "../../components/IntroSection/IntroSection";
import InfoSection from "../../components/InfoSection/InfoSection";
import BrowseCategorySection from "../../components/BrowseCategorySection/BrowseCategorySection";
import TopPicksSection from "../../components/TopPicksSection/TopPicksSection";
function HomePage() {
  return (
    <div>
      <IntroSection />
      <InfoSection />
      <BrowseCategorySection />
      <TopPicksSection />
    </div>
  );
}

export default HomePage;
