import HeroSection from "../AboutUs/HeroSection";
import MissionSection from "../AboutUs/MissionSection";
import TeamSection from "../AboutUs/TeamSection";
import TechStack from "../AboutUs/TechStack";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-200">
      <HeroSection />
      <MissionSection />
      <TeamSection />
      <TechStack />
    </div>
  );
};

export default AboutPage;
