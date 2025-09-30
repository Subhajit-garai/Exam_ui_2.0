// import {  SquareM ,BookOpenCheck} from "lucide-react";
// // import TabManue from "../../../../../packages/ui/src/mycomponents/tabs/TabManue";
import { Tabs } from "@repo/ui/tabs";
import { JoinMock } from "./joinMock";
import { JoinPYQ } from "./JoinPYQ";

export const JoinPYQAndMock = () => {
  //   let MockOptions = [
  //   {
  //     id: 1,
  //     title: "PYQ",
  //     icon: () => <BookOpenCheck color="#6366f1" />,
  //     isDisable: false,
  //     component: <JoinPYQ />,
  //   },
  //   {
  //     id: 1,
  //     title: "Mock",
  //     icon:  ()=> <SquareM color="#10B981" />,
  //     isDisable: false,
  //     component: <JoinMock />,
  //   },
  // ];

  let MockOptions = [
    {
      title: "PYQ",
      value: "PYQ",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl p-10  font-bold text-white g2">
          <JoinPYQ />
        </div>
      ),
    },
    {
      title: "Mock",
      value: "Mock",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl p-10  font-bold text-white g2">
          <JoinMock />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex-1 md:h-160 relative   ">
        {/* <h1 className="text-2xl font-semibold text-center text-primary mb-1">
          Mock
        </h1> */}
        <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
          <Tabs tabs={MockOptions} />
        </div>
      </div>
    </>
  );
};
