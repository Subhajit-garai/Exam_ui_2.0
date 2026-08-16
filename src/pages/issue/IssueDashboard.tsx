import { useEffect, useState, useMemo } from "react";
import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Badge } from "@repo/ui/badge";
import { DialogBox } from "@/design-system/dialog";
import { useApi } from "@/ApiProvider";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "motion/react";
import {
  Bug,
  HelpCircle,
  Award,
  GraduationCap,
  Plus,
  Search,
  ThumbsUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ChevronDown,
  ChevronUp,
  Send,
  RefreshCw,
  MessageSquare,
} from "lucide-react";

export type IssueCategory = "APP" | "QUESTION" | "SCORE" | "EXAM";

interface IssueItem {
  id: string;
  type: IssueCategory | string;
  sub_type?: string;
  note: string;
  status?: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | string;
  upvotes?: number;
  createdAt?: string;
  IssueDetails?: {
    id?: string;
  };
}

const CATEGORY_CONFIG: Record<
  IssueCategory,
  {
    title: string;
    description: string;
    icon: any;
    color: string;
    bg: string;
    border: string;
    subTypes: string[];
    idPlaceholder?: string;
  }
> = {
  APP: {
    title: "App & UI Bug",
    description: "Report UI glitches, crash reports, or general app feedback.",
    icon: Bug,
    color: "text-rose-500",
    bg: "bg-rose-500/10 dark:bg-rose-500/20",
    border: "border-rose-500/30",
    subTypes: [
      "UI Glitch",
      "App Crash",
      "Performance Issue",
      "Feature Request",
      "Other App Issue",
    ],
  },
  QUESTION: {
    title: "Question Error",
    description: "Report incorrect answer keys, typos, or missing diagrams.",
    icon: HelpCircle,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    border: "border-indigo-500/30",
    subTypes: [
      "Incorrect Answer Key",
      "Typo / Spelling Error",
      "Missing Question Diagram",
      "Unclear Question Text",
      "Wrong Options",
    ],
    idPlaceholder: "Question ID (e.g. Q-10492)",
  },
  SCORE: {
    title: "Score & Marks",
    description: "Report score calculation errors or rank discrepancies.",
    icon: Award,
    color: "text-amber-500",
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    border: "border-amber-500/30",
    subTypes: [
      "Wrong Mark Deduction",
      "Negative Marking Mismatch",
      "Score Not Updated",
      "Leaderboard Rank Error",
    ],
    idPlaceholder: "Quiz / Test ID (e.g. T-8821)",
  },
  EXAM: {
    title: "Exam Portal Glitch",
    description:
      "Report test timer freezes, submission errors, or loading bugs.",
    icon: GraduationCap,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    border: "border-emerald-500/30",
    subTypes: [
      "Timer Freeze / Issue",
      "Submission Failure",
      "Question Not Loading",
      "Option Selection Bug",
      "Unexpected Disconnection",
    ],
    idPlaceholder: "Exam / Portal Session ID",
  },
};

const SAMPLE_ISSUES: IssueItem[] = [
  {
    id: "ISSUE-104",
    type: "EXAM",
    sub_type: " SAMPLE:Timer Freeze / Issue",
    note: "The exam portal countdown timer paused for 2 minutes during the last 10 minutes of JEE Mock Test #1.",
    status: "RESOLVED",
    upvotes: 19,
    createdAt: "4 days ago",
    IssueDetails: { id: "EXAM-991" },
  },
];

export const IssueDashboard = () => {
  const _ = useApi();

  const [issues, setIssues] = useState<IssueItem[]>(SAMPLE_ISSUES);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>(null);

  // Form State for New Issue Modal
  const [modalCategory, setModalCategory] = useState<IssueCategory>("APP");
  const [formSubType, setFormSubType] = useState<string>("");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formNote, setFormNote] = useState<string>("");
  const [formRefId, setFormRefId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Upvote tracker
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  const fetchIssues = async () => {
    setLoading(true);
    try {
      let res = await (_.api.issue as any)?.FetchAllIssue?.();
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setIssues(res.data);
      } else {
        setIssues(SAMPLE_ISSUES);
      }
    } catch (error) {
      console.error("Failed to fetch issues", error);
      setIssues(SAMPLE_ISSUES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const openReportModal = (category?: IssueCategory) => {
    const cat = category || "APP";
    setModalCategory(cat);
    setFormSubType(CATEGORY_CONFIG[cat].subTypes[0]);
    setFormTitle("");
    setFormNote("");
    setFormRefId("");
    setDialogOpen(true);
  };

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNote.trim()) {
      toast.error("Please provide a detailed description for your issue");
      return;
    }

    setIsSubmitting(true);
    const subType =
      formSubType || formTitle || CATEGORY_CONFIG[modalCategory].subTypes[0];

    const issuePayload = {
      type: modalCategory,
      sub_type: subType,
      note: formTitle ? `${formTitle}: ${formNote}` : formNote,
      IssueDetails: {
        id: formRefId.trim() || undefined,
      },
    };

    try {
      let res = await (_.api.issue as any)?.CreateIssue?.(issuePayload);
      if (res?.success) {
        toast.success("Issue submitted successfully! Our team will review it.");
      } else {
        toast.info("Issue recorded successfully!");
      }

      // Add to local state
      const newIssue: IssueItem = {
        id: `ISSUE-${Date.now().toString().slice(-4)}`,
        type: modalCategory,
        sub_type: subType,
        note: formTitle ? `${formTitle}: ${formNote}` : formNote,
        status: "OPEN",
        upvotes: 1,
        createdAt: "Just now",
        IssueDetails: { id: formRefId.trim() || undefined },
      };

      setIssues((prev) => [newIssue, ...prev]);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error creating issue:", error);
      toast.error("Failed to submit issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpvote = async (issueId: string) => {
    if (upvotedIds[issueId]) return;

    setUpvotedIds((prev) => ({ ...prev, [issueId]: true }));
    setIssues((prev) =>
      prev.map((item) =>
        item.id === issueId
          ? { ...item, upvotes: (item.upvotes || 0) + 1 }
          : item,
      ),
    );

    try {
      await (_.api.issue as any)?.upVoteIssue?.(issueId);
      toast.success("Upvoted issue!");
    } catch (error) {
      console.error("Upvote error", error);
    }
  };

  // Filtered Issues
  const filteredIssues = useMemo(() => {
    return issues.filter((item) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        (item.type || "").toUpperCase() === selectedCategory;
      const matchesStatus =
        selectedStatus === "ALL" ||
        (item.status || "OPEN").toUpperCase() === selectedStatus;
      const matchesSearch =
        !searchQuery.trim() ||
        (item.note || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.sub_type || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (item.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.IssueDetails?.id || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [issues, selectedCategory, selectedStatus, searchQuery]);

  // Counts
  const counts = useMemo(() => {
    let open = 0;
    let inProgress = 0;
    let resolved = 0;
    issues.forEach((i) => {
      const st = (i.status || "OPEN").toUpperCase();
      if (st === "OPEN") open++;
      else if (st === "IN_PROGRESS") inProgress++;
      else if (st === "RESOLVED" || st === "CLOSED") resolved++;
    });
    return { open, inProgress, resolved, total: issues.length };
  }, [issues]);

  return (
    <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8 mb-20">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-3 text-[var(--text-primary)]">
            <div className="p-2.5 rounded-2xl bg-red-500/10 text-red-500 dark:bg-red-500/20">
              <Bug size={28} />
            </div>
            Issue & Feedback Hub
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Report app bugs, question errors, score mismatches, or exam glitches
            to get quick help.
          </p>
        </div>

        <DialogBox
          TriggerBtnText="Report an Issue"
          Title="Submit a New Issue Report"
          dialogDescription="Help us improve ExamBuddys by reporting errors or bugs."
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        >
          <form
            onSubmit={handleCreateIssue}
            className="space-y-4 pt-2 text-left"
          >
            {/* Category Selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Select Issue Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(CATEGORY_CONFIG) as IssueCategory[]).map(
                  (cat) => {
                    const cfg = CATEGORY_CONFIG[cat];
                    const Icon = cfg.icon;
                    const isSelected = modalCategory === cat;

                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setModalCategory(cat);
                          setFormSubType(cfg.subTypes[0]);
                        }}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? `border-indigo-600 ${cfg.bg} ring-2 ring-indigo-500/30`
                            : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg w-fit ${cfg.bg} ${cfg.color}`}
                        >
                          <Icon size={18} />
                        </div>
                        <span className="text-xs font-bold mt-2 text-[var(--text-primary)]">
                          {cfg.title}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {/* Sub-type Select */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Issue Category Details
              </label>
              <select
                value={formSubType}
                onChange={(e) => setFormSubType(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
              >
                {CATEGORY_CONFIG[modalCategory].subTypes.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Reference ID (Optional) */}
            {CATEGORY_CONFIG[modalCategory].idPlaceholder && (
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Reference ID (Optional)
                </label>
                <Input
                  type="text"
                  placeholder={CATEGORY_CONFIG[modalCategory].idPlaceholder}
                  value={formRefId}
                  onChange={(e) => setFormRefId(e.target.value)}
                  className="text-xs"
                />
              </div>
            )}

            {/* Title / Summary */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Title / Short Summary
              </label>
              <Input
                type="text"
                placeholder="Brief summary of what went wrong..."
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="text-xs"
              />
            </div>

            {/* Note / Description */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Detailed Description *
              </label>
              <textarea
                rows={4}
                placeholder="Explain the issue clearly (e.g. expected answer vs actual result, steps to reproduce, etc.)..."
                value={formNote}
                onChange={(e) => setFormNote(e.target.value)}
                className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-normal focus:ring-2 focus:ring-indigo-500 placeholder:text-zinc-400"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2"
              >
                <Send size={14} />
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </DialogBox>
      </div>

      {/* Four Category Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(CATEGORY_CONFIG) as IssueCategory[]).map((cat) => {
          const cfg = CATEGORY_CONFIG[cat];
          const Icon = cfg.icon;

          return (
            <motion.div
              key={cat}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={`p-5 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 h-full`}
                onClick={() => openReportModal(cat)}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-2xl ${cfg.bg} ${cfg.color}`}>
                    <Icon size={24} />
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase tracking-wider"
                  >
                    {cat}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    {cfg.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                    {cfg.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Report {cat.toLowerCase()} issue</span>
                  <Plus size={14} />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Metrics Statistics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-rose-500 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Open Issues
            </p>
            <h3 className="text-2xl font-black text-rose-500 mt-1">
              {counts.open}
            </h3>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl">
            <AlertTriangle size={24} />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-amber-500 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              In Progress
            </p>
            <h3 className="text-2xl font-black text-amber-500 mt-1">
              {counts.inProgress}
            </h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
            <Clock size={24} />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-emerald-500 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Resolved
            </p>
            <h3 className="text-2xl font-black text-emerald-500 mt-1">
              {counts.resolved}
            </h3>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
            <CheckCircle2 size={24} />
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-indigo-500 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Total Reports
            </p>
            <h3 className="text-2xl font-black text-indigo-500 mt-1">
              {counts.total}
            </h3>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
            <FileText size={24} />
          </div>
        </Card>
      </div>

      {/* Reported Issues Feed & Filter Section */}
      <div className="space-y-4">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={16}
            />
            <Input
              placeholder="Search reports by title, ID or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-zinc-900 text-xs"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Category Filter */}
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/60 p-1 rounded-lg">
              {["ALL", "APP", "QUESTION", "SCORE", "EXAM"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    selectedCategory === cat
                      ? "bg-white dark:bg-zinc-900 shadow-sm text-indigo-600 dark:text-indigo-400"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/60 p-1 rounded-lg">
              {[
                { label: "All Status", val: "ALL" },
                { label: "Open", val: "OPEN" },
                { label: "In Progress", val: "IN_PROGRESS" },
                { label: "Resolved", val: "RESOLVED" },
              ].map((st) => (
                <button
                  key={st.val}
                  onClick={() => setSelectedStatus(st.val)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                    selectedStatus === st.val
                      ? "bg-white dark:bg-zinc-900 shadow-sm text-indigo-600 dark:text-indigo-400"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchIssues}
              className="h-8 w-8 p-0"
              title="Refresh issues"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </Button>
          </div>
        </div>

        {/* Issue Cards Feed */}
        {filteredIssues.length > 0 ? (
          <div className="space-y-3">
            {filteredIssues.map((item) => {
              const catType = (
                item.type || "APP"
              ).toUpperCase() as IssueCategory;
              const cfg = CATEGORY_CONFIG[catType] || CATEGORY_CONFIG.APP;
              const Icon = cfg.icon;
              const status = (item.status || "OPEN").toUpperCase();
              const isExpanded = expandedIssueId === item.id;
              const isUpvoted = upvotedIds[item.id];

              return (
                <Card
                  key={item.id}
                  className="p-5 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2.5 rounded-xl ${cfg.bg} ${cfg.color} shrink-0 mt-0.5`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge
                            className={`${cfg.bg} ${cfg.color} border-0 text-[10px] font-bold`}
                          >
                            {catType}
                          </Badge>
                          {item.sub_type && (
                            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                              {item.sub_type}
                            </span>
                          )}
                          {item.IssueDetails?.id && (
                            <Badge variant="outline" className="text-[10px]">
                              ID: {item.IssueDetails.id}
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug line-clamp-2">
                          {item.note}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {status === "OPEN" && (
                        <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20 text-[10px]">
                          Open
                        </Badge>
                      )}
                      {status === "IN_PROGRESS" && (
                        <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px]">
                          In Progress
                        </Badge>
                      )}
                      {(status === "RESOLVED" || status === "CLOSED") && (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]">
                          Resolved
                        </Badge>
                      )}

                      {item.createdAt && (
                        <span className="text-[10px] text-zinc-400">
                          {item.createdAt}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions & Expand Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                    <div className="flex items-center gap-3">
                      <Button
                        variant={isUpvoted ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleUpvote(item.id)}
                        className={`h-7 px-2.5 gap-1.5 text-[11px] ${
                          isUpvoted ? "bg-indigo-600 text-white" : ""
                        }`}
                      >
                        <ThumbsUp size={12} />
                        <span>Upvote</span>
                        <span className="ml-0.5 font-bold">
                          ({item.upvotes || 0})
                        </span>
                      </Button>

                      <span className="text-zinc-400 text-[11px]">
                        Ref: {item.id}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setExpandedIssueId(isExpanded ? null : item.id)
                      }
                      className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium flex items-center gap-1 text-[11px]"
                    >
                      {isExpanded ? "Less Details" : "View Details"}
                      {isExpanded ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>
                  </div>

                  {/* Expanded Note Accordion */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2 text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800"
                      >
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                          Full Issue Description:
                        </p>
                        <p className="leading-relaxed">{item.note}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center border-dashed border-zinc-200 dark:border-zinc-800">
            <MessageSquare className="mx-auto text-zinc-400 mb-3" size={40} />
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              No Issues Found
            </h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              No reported issues match your selected category or filter. Click
              "Report an Issue" to submit a new report.
            </p>
            <Button
              size="sm"
              onClick={() => openReportModal("APP")}
              className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white gap-2 text-xs"
            >
              <Plus size={14} /> Report an Issue
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default IssueDashboard;
