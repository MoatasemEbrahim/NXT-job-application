import { Inter } from "next/font/google";

import { getLayout } from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <main
      className={`flex flex-col p-8 ${inter.className}`}
    >
      <h2 className="text-white">NXT</h2> 
    </main>
  );
};


Home.getLayout = getLayout;
export default Home;
