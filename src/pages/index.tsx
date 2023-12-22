
import { getLayout } from "@/components/Layout";
import Sessions from "@/components/pages/Sessions";

const Home = () => (
  <Sessions />
);


Home.getLayout = getLayout;
export default Home;
