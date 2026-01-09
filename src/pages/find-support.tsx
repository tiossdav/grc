import { Header } from "@/components/layout/header";

import Footer from "@/components/layout/footer";
import InvestorsHub from "./support/investor-hub";

const Support = () => {
  return (
    <div className="">
      <Header />

      <main className="bg-[#caebe6]">
        <InvestorsHub />
      </main>
      <Footer />
    </div>
  );
};
export default Support;
