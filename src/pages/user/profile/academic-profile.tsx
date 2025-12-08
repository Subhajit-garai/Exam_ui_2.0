import { Card, NestedCard } from "@/design-system/card";
import { IconSchool, IconBook, IconTarget, IconBuildingSkyscraper, IconEdit, IconCheck, IconX } from "@tabler/icons-react";
import { Button } from "@repo/ui/button";
import { Tooltip_two } from "@/design-system/tooltip/tooltip_two";
import { useState, useEffect } from "react";
import { useApi } from "@/ApiProvider";
import { toast } from "react-toastify";
import { ToastConfig } from "@/lib";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { SelectionInput, Textinput } from "@/design-system";
import useHandleinpute from "@/hooks/useHandleInpute";



const standardOptions = [
    "11th",
    "12th",
    "College 1st",
    "College 2nd",
    "College 3rd",
    "College 4th",
    "Dropper"
];

export const AcademicProfile = () => {
    const { api } = useApi();
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    // Selection state for Target Exam

    let init = {
        category: "",
        exam: "",
        year: "",
        standard: "",
        stream: "",
        institution: "",
    };

    let { value, handleInputefn, setValue } = useHandleinpute(init);

    // Redux state
    const { examCategorys, AvailableexamsShortCode } = useAppSelector((state) => state.exam);
    const user = useAppSelector((state) => state.user);

    // Load user data into local state
    useEffect(() => {
        if (user.academicProfile) {
            setValue((prev) => ({
                ...prev,
                category: user.academicProfile?.category || "",
                exam: user.academicProfile?.exam || "",
                year: user.academicProfile?.year || "",
                standard: user.standard || "",
                stream: user.stream || "",
                institution: user.school || ""
            }));
        }
    }, [user]);

    // Fetch categories on mount
    useEffect(() => {
        if (isEditing && (!examCategorys || examCategorys.length === 0)) {
            api.exam.fetchCategorys(dispatch);
        }
    }, [examCategorys, isEditing]);

    // Fetch exams when category changes
    useEffect(() => {
        if (value.category) {
            api.exam.fetchAvalibleExam(dispatch, value.category);

            // Check if we are loading the saved profile
            const isSavedProfile = user.academicProfile &&
                value.category === user.academicProfile.category &&
                value.exam === user.academicProfile.exam;

            if (!isSavedProfile) {
                setValue((prev) => ({ ...prev, exam: "" }));
            }
        }
    }, [value.category]);


    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await api.user.updateAcademicProfile({
                academicProfile: {
                    category: value.category,
                    exam: value.exam,
                    year: value.year
                },
                standard: value.standard,
                stream: value.stream,
                school: value.institution
            });
            if (res.success) {
                toast.success("Academic profile updated successfully", ToastConfig(1000));
                setIsEditing(false);
            } else {
                toast.error("Failed to update academic profile", ToastConfig(1000));
            }
        } catch (error) {
            toast.error("An error occurred while updating", ToastConfig(1000));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Generate year options (current year + 5)
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 6 }, (_, i) => (currentYear + i).toString());

    return (
        <Card className="p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Academic Profile</h3>
                <Tooltip_two tooltiptext={isEditing ? "Cancel Edit" : "Edit Profile"}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? <IconX size={18} /> : <IconEdit size={18} />}
                    </Button>
                </Tooltip_two>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NestedCard className="flex-row items-start justify-start gap-3 p-3 col-span-1 md:col-span-2">
                    <div className="p-2 bg-primary/10 rounded-full text-primary mt-1">
                        <IconTarget size={20} />
                    </div>
                    <div className="flex-1 w-full">
                        <p className="text-sm text-muted-foreground mb-2">Target Exam</p>

                        {/* Display Selected Exam (Read Only) */}
                        {!isEditing && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {value.exam ? (
                                    <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-md border border-border/50">
                                        <span className="text-sm font-medium">{value.exam} ({value.year})</span>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">No target exam selected</p>
                                )}
                            </div>
                        )}

                        {/* Edit Mode Selection */}
                        {isEditing && (
                            <div className="flex flex-col gap-3 p-3 bg-secondary/20 rounded-lg border border-border/50">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

                                    <SelectionInput
                                        containerClass="gap-2 flex flex-col text-primary "
                                        options={[
                                            {
                                                id: "1",
                                                inputId: "input-category",
                                                lable: "Select category",
                                                placeholder: "Select exam category",
                                                required: true,
                                                options: examCategorys.map((e) => e.name),
                                                name: "category",
                                            },
                                            {
                                                id: "2",
                                                inputId: "input-exam",
                                                lable: "Select exam",
                                                placeholder: "Select exam",
                                                required: true,
                                                options: AvailableexamsShortCode,
                                                name: "exam",
                                            },
                                            {
                                                id: "3",
                                                inputId: "input-year",
                                                lable: "Select year",
                                                placeholder: "Select year",
                                                required: true,
                                                options: yearOptions,
                                                name: "year",
                                            },
                                        ]}
                                        value={value}
                                        handleInputefn={handleInputefn}
                                    />

                                </div>
                            </div>
                        )}
                    </div>
                </NestedCard>

                <NestedCard className="flex-row items-center justify-start gap-3 p-3">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <IconBook size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Standard</p>
                        {isEditing ? (
                            <SelectionInput
                                value={value}
                                handleInputefn={handleInputefn}
                                containerClass="gap-2 flex flex-col text-primary "
                                options={[
                                    {
                                        id: "1",
                                        inputId: "input-standard",
                                        placeholder: "Select Standard",
                                        options: standardOptions,
                                        name: "standard",
                                        lable: "Select Standard",
                                        required: false,
                                    },

                                ]}
                            />
                        ) : (
                            <p className="font-medium">{value.standard}</p>
                        )}
                    </div>
                </NestedCard>

                <NestedCard className="flex-row items-center justify-start gap-3 p-3">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <IconSchool size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Stream</p>
                        {isEditing ? (
                            <Textinput
                                value={value}
                                handleInputefn={handleInputefn}
                                containerClass="gap-2 flex flex-col text-primary "
                                options={[
                                    {
                                        id: "1",
                                        inputId: "input-stream",
                                        placeholder: "Enter stream",
                                        name: "stream",
                                        lable: " enter stream",
                                        required: false,
                                    },

                                ]}
                            />
                        ) : (
                            <p className="font-medium">{value.stream}</p>
                        )}
                    </div>
                </NestedCard>

                <NestedCard className="flex-row items-center justify-start gap-3 p-3">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <IconBuildingSkyscraper size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Institution Name</p>
                        {isEditing ? (
                            <Textinput
                                value={value}
                                handleInputefn={handleInputefn}
                                containerClass="gap-2 flex flex-col text-primary "
                                options={[
                                    {
                                        id: "1",
                                        inputId: "input-institution",
                                        placeholder: "Enter institution name",
                                        name: "institution",
                                        lable: "Enter institution name",
                                        required: false,
                                    },

                                ]}
                            />
                        ) : (
                            <p className="font-medium">{value.institution}</p>
                        )}
                    </div>
                </NestedCard>

                {isEditing && (
                    <div className="col-span-1 md:col-span-2 flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={loading}
                            className="gap-1"
                        >
                            <IconCheck size={16} /> Save Changes
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
};
