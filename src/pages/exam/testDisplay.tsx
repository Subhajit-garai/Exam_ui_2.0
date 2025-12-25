
import { LoaderFive } from "@/design-system/loader/loader";
import JoinerxamCard from "./JoinerxamCard";
import { useIsMobile } from "@/hooks";
import type { SetStateAction } from "react";
import { SimplePagination as Pagination } from "@repo/design-system/pagenation";

export const ExamDisplay = ({
    Data,
    entryChange,
    type,
    noTitle = " No Tests",
    currentPage,
    setCurrentPage,
    TestCount,
    imageurl = "/assets/cardbg/background2.jpg"
}: {
    Data: any;
    entryChange: string;
    type: string;
    noTitle?: string;
    currentPage: number;
    setCurrentPage: React.Dispatch<SetStateAction<number>>;
    TestCount: number;
    imageurl?: string;
}) => {
    const EXAMS_PER_PAGE = 12;
    const isMobile = useIsMobile();

    return (
        <>
            {TestCount ? (
                <div className=" flex  h-full w-full flex-col justify-between p-2 gap-4 overflow-auto no-visible-scrollbar">

                    <div className="exams flex gap-2 justify-center flex-wrap">
                        {Data?.length ? (
                            Data.map((exam: any) => {
                                if (exam.examtype == type) {
                                    return (
                                        <JoinerxamCard
                                            key={exam.id}
                                            imageurl={imageurl}
                                            contestid={exam?.id}
                                            displayId={exam?.display_id}
                                            Title={exam?.name}
                                            timeStamp={exam?.date}
                                            startTime={exam?.starttime}
                                            joinTime={exam?.jointime}
                                            particepents={exam?.ContestRegister?.count}
                                            entryChange={entryChange}
                                            status={exam?.creationstatus}
                                            examtype={exam?.examtype}
                                        />
                                    );
                                }
                            })
                        ) : (
                            <p> {noTitle} </p>
                        )}
                    </div>

                    {/* Middle: Pagination */}
                    <div className="w-full flex justify-center ">
                        {isMobile ? (
                            <Pagination
                                layout="center"
                                currentPage={currentPage}
                                itemsPerPage={EXAMS_PER_PAGE}
                                totalItems={TestCount}
                                onPageChange={setCurrentPage}
                            />
                        ) : (
                            <Pagination
                                layout="center"
                                currentPage={currentPage}
                                itemsPerPage={EXAMS_PER_PAGE}
                                totalItems={TestCount}
                                //totalPages={Math.max(1, Math.ceil(TestCount / EXAMS_PER_PAGE || 0))}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <LoaderFive text="Loading..." />
            )}
        </>
    );
};