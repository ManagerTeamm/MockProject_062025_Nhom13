import Layout from '../components/baseLayout';
import HeroSection from '../components/heroSection';
import HowYouCanHelp from '../components/howYouCanHelp';
import ProgramsResources from '../components/programsResources';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <HowYouCanHelp />
      <ProgramsResources />
    </Layout>
  );
}
