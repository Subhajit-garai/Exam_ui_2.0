
// import LeaderBoard from "./metrix/LeaderBoard";
import ContestAttemptChart from "./metrix/ContestAttempChart";


export const Contest = () => {
  return (
    <div className="flex-1 overflow-auto relative  md:h-160">
      {/* <Header title="Overview" /> */}

      <main className=" w-full md:max-w-7xl mx-auto md:py-6 md:px-4 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-8">
          <ContestAttemptChart/>
          {/* <LeaderBoard/> */}
          
        </div>
      </main>
    </div>
  );
};
