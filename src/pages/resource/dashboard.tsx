import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Badge } from "@repo/ui/badge";
import { DialogBox } from "@/design-system/dialog";
import { StatusAlert } from "@/design-system";
import { useAppDispatch, useAppSelector } from "@repo/store/hook";
import { useApi } from "@/ApiProvider";
import { motion } from "motion/react";
import {
  BookOpen,
  NotebookPen,
  Tv,
  Search,
  Play,
  Sparkles,
  ChevronRight,
  GraduationCap,
  ArrowRight,
  FileText,
  Youtube,
  ExternalLink,
  Target,
  Zap,
  Book,
  Compass,
} from "lucide-react";

interface SubjectData {
  id?: string;
  name: string;
  slug?: string;
  topicCount?: number;
  description?: string;
}

interface VideoPlaylist {
  id: string;
  title: string;
  subject: string;
  playlistUrl: string;
  embedUrl?: string;
  channelName?: string;
  videoCount?: number;
  thumbnailUrl?: string;
}

const extractYouTubeId = (url: string) => {
  if (!url) return null;
  const playlistMatch = url.match(/[?&]list=([^#&?]+)/);
  if (playlistMatch && playlistMatch[1]) {
    return { type: "playlist", id: playlistMatch[1] };
  }
  const videoMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (videoMatch && videoMatch[1]) {
    return { type: "video", id: videoMatch[1] };
  }
  return null;
};

const getEmbedUrl = (playlist: VideoPlaylist) => {
  if (playlist.embedUrl) return playlist.embedUrl;
  const parsed = extractYouTubeId(playlist.playlistUrl);
  if (parsed?.type === "playlist") {
    return `https://www.youtube.com/embed/videoseries?list=${parsed.id}`;
  }
  if (parsed?.type === "video") {
    return `https://www.youtube.com/embed/${parsed.id}`;
  }
  return playlist.playlistUrl;
};

const getThumbnailUrl = (playlist: VideoPlaylist) => {
  if (playlist.thumbnailUrl) return playlist.thumbnailUrl;
  const parsed = extractYouTubeId(playlist.playlistUrl);
  if (parsed?.type === "video") {
    return `https://img.youtube.com/vi/${parsed.id}/hqdefault.jpg`;
  }
  return "/assets/cardbg/background2.jpg";
};

const getSubjectTheme = (name: string) => {
  const normalized = (name || "").toLowerCase();
  if (normalized.includes("math")) {
    return {
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "hover:border-blue-500/50",
      gradient: "from-blue-500/10 to-indigo-500/5",
    };
  }
  if (normalized.includes("physic")) {
    return {
      bg: "bg-purple-500/10 dark:bg-purple-500/20",
      text: "text-purple-600 dark:text-purple-400",
      border: "hover:border-purple-500/50",
      gradient: "from-purple-500/10 to-pink-500/5",
    };
  }
  if (normalized.includes("chem")) {
    return {
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "hover:border-emerald-500/50",
      gradient: "from-emerald-500/10 to-teal-500/5",
    };
  }
  if (normalized.includes("bio")) {
    return {
      bg: "bg-rose-500/10 dark:bg-rose-500/20",
      text: "text-rose-600 dark:text-rose-400",
      border: "hover:border-rose-500/50",
      gradient: "from-rose-500/10 to-amber-500/5",
    };
  }
  return {
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
    border: "hover:border-amber-500/50",
    gradient: "from-amber-500/10 to-orange-500/5",
  };
};

export const ResourceDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const _ = useApi();

  const { Subjects } = useAppSelector((state) => state.note);
  const { academic_profile } = useAppSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [playlists, setPlaylists] = useState<VideoPlaylist[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    // Fetch subjects if needed
    (_.api.notes as any)?.fetchAvalibleSubjectforUser?.(dispatch);

    // Fetch video resources
    const fetchVideos = async () => {
      setLoadingVideos(true);
      try {
        let res = await (_.api.notes as any)?.fetchVideos?.();
        if (res?.success && Array.isArray(res.data)) {
          setPlaylists(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch videos for resource dashboard", error);
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchVideos();
  }, [dispatch, _]);

  // Fallback subjects if API returns empty array initially
  const displaySubjects: SubjectData[] = useMemo(() => {
    if (Subjects && Subjects.length > 0) {
      return Subjects;
    }
    return [
      { name: "Mathematics", slug: "mathematics", topicCount: 18 },
      { name: "Physics", slug: "physics", topicCount: 24 },
      { name: "Chemistry", slug: "chemistry", topicCount: 20 },
      { name: "Biology", slug: "biology", topicCount: 16 },
    ];
  }, [Subjects]);

  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return displaySubjects;
    return displaySubjects.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [displaySubjects, searchQuery]);

  const featuredPlaylists = useMemo(() => {
    if (!playlists || playlists.length === 0) return [];
    if (!searchQuery.trim()) return playlists.slice(0, 3);
    return playlists.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [playlists, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/resource/notes`);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8 mb-20">
      {/* Profile Warning Alert */}
      {!academic_profile && (
        <StatusAlert
          type="warning"
          title="Academic Profile Unconfigured"
          message={
            <span>
              Please{" "}
              <Link to="/user/profile" className="underline font-semibold">
                update your academic profile
              </Link>{" "}
              to get customized notes and video lectures tailored to your target exam.
            </span>
          }
        />
      )}

      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-zinc-900 to-slate-900 text-white p-6 sm:p-8 md:p-10 shadow-2xl border border-zinc-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 backdrop-blur-md text-xs font-semibold">
              <GraduationCap size={16} />
              <span>
                {academic_profile?.year
                  ? `Target Exam: ${academic_profile.year}`
                  : "Learning & Revision Hub"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Study Smart with Curated{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-rose-400">
                Resources
              </span>
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Explore subject-wise comprehensive notes, interactive video playlists, key formula sheets, and top-tier study guides designed for exam success.
            </p>

            {/* Quick Search Form */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="relative flex items-center max-w-lg">
                <Search
                  className="absolute left-4 text-zinc-400 pointer-events-none"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Search notes, topics, formulas, or video playlists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-24 py-3 h-12 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-zinc-400 rounded-xl focus-visible:ring-indigo-400"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 h-9 rounded-lg"
                >
                  Explore
                </Button>
              </div>
            </form>
          </div>

          {/* Banner Quick Stats Badge */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-72 shrink-0">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl flex flex-col justify-between">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-2">
                <NotebookPen size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {displaySubjects.length}
                </p>
                <p className="text-xs text-zinc-400 font-medium">
                  Active Subjects
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl flex flex-col justify-between">
              <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-300 flex items-center justify-center mb-2">
                <Tv size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {playlists.length || "12+"}
                </p>
                <p className="text-xs text-zinc-400 font-medium">
                  Video Playlists
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Resource Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Notes Hub Card */}
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <Card
            className="p-6 h-full border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all cursor-pointer bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20 flex flex-col justify-between"
            onClick={() => navigate("/resource/notes")}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-indigo-600/30">
                <NotebookPen size={24} />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                Subject Notes
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Topic-by-topic structured notes with diagrams, key formulas, and examples.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-indigo-600 dark:text-indigo-400 font-semibold text-xs pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span>View Notes</span>
              <ChevronRight size={16} />
            </div>
          </Card>
        </motion.div>

        {/* Video Lectures Card */}
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <Card
            className="p-6 h-full border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all cursor-pointer bg-gradient-to-b from-red-50/50 to-transparent dark:from-red-950/20 flex flex-col justify-between"
            onClick={() => navigate("/resource/videos")}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-red-600/30">
                <Tv size={24} />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                Video Playlists
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Handpicked video series from top educators to clarify complex topics fast.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-red-600 dark:text-red-400 font-semibold text-xs pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span>Watch Videos</span>
              <ChevronRight size={16} />
            </div>
          </Card>
        </motion.div>

        {/* Practice & Mock Analysis Card */}
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <Card
            className="p-6 h-full border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all cursor-pointer bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-950/20 flex flex-col justify-between"
            onClick={() => navigate("/analysis/test")}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
                <Target size={24} />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                Practice Analysis
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Assess your subject strengths and identify weak areas before test day.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-amber-600 dark:text-amber-400 font-semibold text-xs pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span>Check Performance</span>
              <ChevronRight size={16} />
            </div>
          </Card>
        </motion.div>

        {/* Exam Quick Formula / Revision */}
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <Card
            className="p-6 h-full border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all cursor-pointer bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 flex flex-col justify-between"
            onClick={() => navigate("/resource/notes")}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-emerald-600/30">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                Quick Revision
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Rapid formula sheets, mind maps, and high-yield revision summaries.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold text-xs pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span>Explore Guides</span>
              <ChevronRight size={16} />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Subject-Wise Resources Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
              <BookOpen className="text-indigo-600 dark:text-indigo-400" size={22} />
              Subject Resources Explorer
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Select a subject to view available notes, topic modules, and targeted videos.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/resource/notes")}
            className="gap-1 text-xs"
          >
            All Subjects <ArrowRight size={14} />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSubjects.map((sub, idx) => {
            const theme = getSubjectTheme(sub.name);
            const slug = sub.slug || sub.name.toLowerCase();

            return (
              <motion.div
                key={sub.id || idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`p-5 border border-zinc-200 dark:border-zinc-800 ${theme.border} transition-all cursor-pointer bg-gradient-to-br ${theme.gradient} flex flex-col justify-between space-y-4 h-full`}
                  onClick={() => navigate(`/resource/notes/${slug}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-2xl ${theme.bg} ${theme.text}`}>
                      <Book size={24} />
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-semibold">
                      {sub.topicCount ? `${sub.topicCount} Topics` : "Notes"}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-[var(--text-primary)]">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                      Comprehensive theory, formulas, and topic-wise study notes.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                    <span className="font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <FileText size={14} /> View Notes
                    </span>
                    <ChevronRight size={14} className="text-zinc-400" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Featured Video Playlists & Spotlight Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Lectures Spotlight */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
                <Youtube className="text-red-600" size={24} />
                Featured Video Lectures
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Top playlists recommended for conceptual clarity.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/resource/videos")}
              className="gap-1 text-xs hover:text-red-500"
            >
              View All Videos <ArrowRight size={14} />
            </Button>
          </div>

          {loadingVideos ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2].map((n) => (
                <Card
                  key={n}
                  className="h-48 animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-xl"
                />
              ))}
            </div>
          ) : featuredPlaylists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredPlaylists.map((item) => {
                const thumbnail = getThumbnailUrl(item);
                const embed = getEmbedUrl(item);

                return (
                  <Card
                    key={item.id}
                    className="overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all group flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-zinc-900 overflow-hidden cursor-pointer">
                      <img
                        src={thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play size={18} className="fill-white ml-0.5" />
                        </div>
                      </div>
                      <Badge className="absolute top-2 left-2 bg-red-600 text-white text-[10px] gap-1 font-semibold">
                        <Youtube size={10} />
                        {item.subject}
                      </Badge>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-sm text-[var(--text-primary)] line-clamp-2 leading-snug group-hover:text-red-500 transition-colors">
                          {item.title}
                        </h3>
                        {item.channelName && (
                          <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                            <Sparkles size={11} className="text-amber-500" />
                            {item.channelName}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <DialogBox
                          TriggerBtnText="Watch Now"
                          Title={item.title}
                          dialogDescription={`Subject: ${item.subject} | Channel: ${item.channelName || "YouTube"}`}
                        >
                          <div className="w-full aspect-video rounded-lg overflow-hidden bg-black mt-2">
                            <iframe
                              src={embed}
                              title={item.title}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </DialogBox>

                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-[11px] ml-auto hover:text-red-500 h-8"
                          onClick={() => window.open(item.playlistUrl, "_blank")}
                        >
                          YT <ExternalLink size={10} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-8 text-center border-dashed border-zinc-200 dark:border-zinc-800">
              <Tv className="mx-auto text-zinc-400 mb-2" size={36} />
              <p className="text-sm font-semibold">No video playlists found</p>
              <p className="text-xs text-zinc-500 mt-1">
                Explore notes or check back soon for video updates.
              </p>
            </Card>
          )}
        </div>

        {/* Study Tips & Recommended Tools Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 bg-zinc-900 text-white border-none shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl">
                <Compass size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base">Study Recommendation</h3>
                <p className="text-xs text-zinc-400">Effective Revision Strategy</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-zinc-300 leading-relaxed pt-2 border-t border-zinc-800">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600/50 text-indigo-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p>Read subject notes once for theoretical clarity before practice tests.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600/50 text-indigo-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p>Watch video lectures for complex topics & problem solving tricks.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600/50 text-indigo-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <p>Review formula cheat-sheets right before starting mock tests.</p>
              </div>
            </div>

            <Button
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold h-9 rounded-lg"
              onClick={() => navigate("/resource/notes")}
            >
              Start Reading Notes
            </Button>
          </Card>

          {/* Quick Links Card */}
          <Card className="p-6 border-zinc-200 dark:border-zinc-800 space-y-4">
            <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              Quick Resource Links
            </h3>

            <div className="space-y-2 text-xs">
              <div
                onClick={() => navigate("/resource/notes")}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 font-medium">
                  <NotebookPen size={16} className="text-indigo-500" />
                  <span>All Subject Notes</span>
                </div>
                <ChevronRight size={14} className="text-zinc-400" />
              </div>

              <div
                onClick={() => navigate("/resource/videos")}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 font-medium">
                  <Tv size={16} className="text-red-500" />
                  <span>Video Playlists</span>
                </div>
                <ChevronRight size={14} className="text-zinc-400" />
              </div>

              <div
                onClick={() => navigate("/analysis/dashboard")}
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 font-medium">
                  <Target size={16} className="text-amber-500" />
                  <span>Performance Dashboard</span>
                </div>
                <ChevronRight size={14} className="text-zinc-400" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResourceDashboard;
