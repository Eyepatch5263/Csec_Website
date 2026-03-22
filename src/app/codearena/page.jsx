import Background from "../../components/background";
import CodeArena from "../../components/CodeArena"
import AboutCompetition from "../../components/aboutCA";
import Sponsors from "../../components/sponsors";
import Footer from "../../components/ui/Footer";
import PrizePool from "../../components/PrizePool";
import Countdown from "../../components/Countdown";
import Timeline from "../../components/timeline";
import QueryForm from "../../components/queryform";
import Events from "../../components/events1";
export default function Home() {
  return (
    <>
      <Background />
      <CodeArena/>
      <Countdown/>
      <AboutCompetition/>
      <Events></Events>
      <PrizePool/>
      <Timeline/>
      <Sponsors/>
      <QueryForm/>
      <Footer/>
    </>

  );
}


