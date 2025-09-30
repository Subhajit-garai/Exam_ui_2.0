import  { useEffect } from "react";
// import ProgressCard from "../../components/ui/ProgressCard.jsx";
// import Servicecard from "../../components/ui/Servicecard.jsx";
import { useAppDispatch } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";


// let status = [
//   {
//     id: 1,
//     text: "Submited work",
//     icon: <AlarmClockCheck className="text-blue-700 " size={40} />,
//     icon_bg: "bg-blue-300",
//     count: 23,
//     totalCount: 40,
//     link: "/test",
//   },
//   {
//     id: 2,
//     text: "Exams Attended",
//     icon: <BookCheck className="text-indigo-700 " size={40} />,
//     icon_bg: "bg-indigo-200",
//     count: 0,
//     totalCount: 40,
//     link: "/test",
//   },
//   {
//     id: 3,
//     text: "Top in Exams ",
//     icon: <Trophy className="text-yellow-700 " size={40} />,
//     icon_bg: "bg-yellow-300",
//     count: 0,
//     totalCount: 40,
//     link: "/test",
//   },
//   {
//     id: 4,
//     text: "Daily Routine",
//     icon: <Medal className="text-violet-700 " size={40} />,
//     icon_bg: "bg-violet-300",
//     count: 0,
//     totalCount: 30,
//     link: "/test",
//   },
//   {
//     id: 5,
//     text: "Registered Exams",
//     icon: <LandPlot className="text-pink-700 " size={40} />,
//     icon_bg: "bg-pink-300",
//     count: 0,
//     totalCount: 40,
//     link: "/test",
//   },
// ];
// let survice = [
//   {
//     id: 1,
//     btnText: "Go to Exam",
//     heading: "Attened Exam",
//     paragraph:
//       "This will help you build confidence, stay motivated, and improve your skills through practice exams.",
//     imageUrl: "./assets/exam.jpg",
//     link: "/test/join",
//     btnColor: "",
//   },
//   {
//     id: 2,
//     btnText: "Go to Exam",
//     heading: "Subject-Wise Mock Tests",
//     paragraph:
//       "Focus on one subject at a time with targeted mock exams to build mastery and boost confidence in every topic.",
//     imageUrl: "./assets/exam_blue.jpg",
//     link: "/test/join",
//     btnColor: "",
//   },
//   {
//     id: 3,
//     btnText: "Go to Exam",
//     heading: "Full-Length Mock Exams",
//     paragraph:
//       "Simulate real exam conditions with full-length mock tests and build the confidence to perform under pressure.",
//     imageUrl: "./assets/resource.jpg",
//     link: "/test/join",
//     btnColor: "",
//   },
//   {
//     id: 4,
//     btnText: "Go to Exam",
//     heading: "Timed Practice Tests",
//     paragraph:
//       "Enhance your time management and accuracy with timed practice tests designed to maximize your performance.",
//     imageUrl: "./assets/topper.jpg",
//     link: "/test/join",
//     btnColor: "",
//   },
// ];

const Home = () => {
  const dispatch = useAppDispatch();
  const _ = useApi()
  useEffect(() => {
    _.api.user.fetchuser(dispatch);
  }, []);
  return (
    <>
      <div className="main w-full grid grid-cols-1 gap-4 lg:grid-cols-3">

       


        </div>
        {/* <div className="StatusCont w-full flex flex-col gap-4 items-center  sm:grid sm:grid-cols-2  sm:justify-items-center lg:flex">
          {status.map((s) => (
            <ProgressCard
              key={s.id}
              Icon={s.icon}
              icon_bg={s.icon_bg}
              count={s.count}
              totalCount={s.totalCount}
              text={s.text}
            />
          ))}
        </div> */}
        {/* <div className="surviceCont w-full  flex flex-col gap-4 items-center mb-20 sm:grid sm:grid-cols-2  sm:justify-items-center lg:flex lg:col-span-3 lg:flex-row lg:justify-center">
          {survice.map((s) => (
            <Servicecard
              key={s.id}
              btnText={s.btnText}
              heading={s.heading}
              para={s.paragraph}
              imageurl={s.imageUrl}
              link={s.link}
              btnColor={s.btnColor}
            />
          ))}
        </div> */}

        <div className="  legal  w-full  flex flex-col gap-4 items-center mb-20 sm:grid sm:grid-cols-2  sm:justify-items-center lg:flex lg:col-span-3 lg:flex-row lg:justify-center">
          {/* <LegalPages /> */}

          {/* <CardDemo/> */}
          {/* <Trashbtn/>
           */}

           {/* <AnimatedModalBasecomp/> */}

        </div>
    </>
  );
};

export default Home;




