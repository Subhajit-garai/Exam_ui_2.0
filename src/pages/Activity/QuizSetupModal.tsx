import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@repo/ui/dialog";
import { Button } from "@repo/ui/button";
import Textinput, { SelectionInput } from "@/design-system/inputs/InputComponents";
import { Checkbox } from "@repo/ui/checkbox";
import { Label } from "@repo/ui/label";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "@/ApiProvider";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import useHandleinpute from "@/hooks/useHandleInpute";
import { toast } from "react-toastify";
import { ToastConfig } from "@/lib";

interface QuizSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode?: string;
}

export const QuizSetupModal = ({ isOpen, onClose, mode = "1v1" }: QuizSetupModalProps) => {
    const navigate = useNavigate();

    const init = {
        mode: mode,
        subject: "",
        topic: "",
        total_questions: "",
        nextQuestionTime: "",
        quizOpenFor: "",
    };

    const { value, handleInputefn, setValue } = useHandleinpute(init);

    useEffect(() => {
        setValue((prev) => ({ ...prev, mode: mode }));
    }, [mode, isOpen]);

    const _ = useApi();
    const dispatch = useAppDispatch()

    const { target_exam } = useAppSelector((state) => state.user);
    const { subjectNames, topicNames, Subjects } = useAppSelector((state) => state.note);

    const [loadingSubjects, setLoadingSubjects] = useState(false);
    const [loadingTopics, setLoadingTopics] = useState(false);
    const [isAllTopics, setIsAllTopics] = useState(false);

    useEffect(() => {
        const fetchSubjects = async () => {
            setLoadingSubjects(true);
            try {
                // Fetch subjects for the target exam if available
                await _.api.notes.getSubjects(target_exam, dispatch, true);
            } catch (error) {
                console.error("Failed to fetch subjects", error);
            } finally {
                setLoadingSubjects(false);
            }
        };
        fetchSubjects();
    }, [target_exam]);

    useEffect(() => {
        if (!value.subject) {
            return;
        }
        const fetchTopics = async () => {
            setLoadingTopics(true);
            try {

                let subjectslug = Subjects.find((s) => s.name === value.subject)?.slug;
                if (!subjectslug) {
                    toast.error("Subject not found", ToastConfig(1000))
                    return;
                }
                await _.api.notes.getTopics(subjectslug, dispatch, true);
            } catch (error) {
                console.error("Failed to fetch topics", error);
            } finally {
                setLoadingTopics(false);
            }
        };
        fetchTopics();
    }, [value.subject]);

    const handleStart = async () => {
        const selectedTopic = isAllTopics ? "All" : value.topic;
        try {
            const response = await _.api.quiz.createQuiz({
                ...value,
                subject: value.subject,
                topic: selectedTopic,
            });

            if (response.success) {
                toast.success("Quiz created successfully", ToastConfig());
                // Assuming the response contains the created quiz ID
                const quizId = response.data.id;
                navigate(`/quiz/start?id=${quizId}&mode=${value.mode}&subject=${value.subject}&topic=${selectedTopic}`);
                onClose();
            } else {
                toast.error(response.message || "Failed to create quiz", ToastConfig());
            }

            await _.api.activity.logActivity({
                type: "QUIZ",
                title: "Quiz Started",
                status: "STARTED",
                description: `Started ${value.mode} quiz on ${value.subject} - ${selectedTopic}`,
                metadata: {
                    mode: value.mode,
                    subject: value.subject,
                    topic: selectedTopic
                }
            });
        } catch (error) {
            console.error("Failed to create quiz", error);
            toast.error("Something went wrong", ToastConfig());
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Setup {value.mode} Quiz</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <SelectionInput
                        value={value}
                        handleInputefn={handleInputefn}
                        options={[{
                            id: "mode",
                            inputId: "mode-select",
                            name: "mode",
                            lable: "Mode",
                            placeholder: "Select Mode",
                            options: ["1v1", "1v2", "1v3", "1v4"],
                            required: true
                        }]}
                    />
                    <SelectionInput
                        value={value}
                        handleInputefn={handleInputefn}
                        options={[{
                            id: "1",
                            inputId: "subject-select",
                            name: "subject",
                            lable: "Subject",
                            placeholder: loadingSubjects ? "Loading..." : "Select Subject",
                            options: subjectNames,
                            required: true,
                            disabled: loadingSubjects
                        },
                        ]}
                    />

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="all-topics"
                            checked={isAllTopics}
                            onCheckedChange={(checked) => {
                                setIsAllTopics(checked as boolean);
                                if (checked) {
                                    setValue(prev => ({ ...prev, topic: "" }));
                                }
                            }}
                            disabled={!value.subject}
                        />
                        <Label htmlFor="all-topics">Include all topics from {value.subject || "selected subject"}</Label>
                    </div>

                    <SelectionInput
                        value={value}
                        handleInputefn={handleInputefn}
                        options={[{
                            id: "2",
                            inputId: "topic-select",
                            name: "topic",
                            lable: "Topic",
                            placeholder: loadingTopics ? "Loading..." : "Select Topic",
                            options: topicNames,
                            required: true,
                            disabled: !value.subject || loadingTopics || isAllTopics
                        }]}
                    />



                    <Textinput
                        value={value}
                        handleInputefn={handleInputefn}
                        options={[{
                            id: "1",
                            inputId: "total-questions",
                            type: "number",
                            name: "total_questions",
                            lable: "Total Questions",
                            placeholder: "Enter Total Questions",
                            required: true,
                            disabled: !value.subject || loadingTopics || isAllTopics
                        },
                        {
                            id: "2",
                            inputId: "next-question-time",
                            name: "nextQuestionTime",
                            type: "number",
                            lable: "Next Question Time",
                            placeholder: "Enter Next Question Time in seconds",
                            required: true,
                            disabled: !value.subject || loadingTopics || isAllTopics
                        },
                        {
                            id: "3",
                            inputId: "quiz-open-for",
                            name: "quizOpenFor",
                            type: "number",
                            lable: "Quiz Open For",
                            placeholder: "Enter Quiz Open For",
                            required: true,
                            disabled: !value.subject || loadingTopics || isAllTopics
                        }]}
                    />


                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleStart} disabled={!value.subject || (!value.topic && !isAllTopics)}>Start Quiz</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
