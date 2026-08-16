import { useEffect, useState, useMemo } from "react";
import { Card } from "@/design-system/card";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Badge } from "@repo/ui/badge";
import {
  Search,
  Play,
  Youtube,
  ExternalLink,
  Tv,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useApi } from "@/ApiProvider";
import { DialogBox } from "@/design-system/dialog";

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
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
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

export default function VideoList() {
  const _ = useApi();
  const [playlists, setPlaylists] = useState<VideoPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        let res = await (_.api.notes as any)?.fetchVideos?.();
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setPlaylists(res.data);
        } else {
          setPlaylists([]);
        }
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const subjects = useMemo(() => {
    const set = new Set<string>();
    playlists.forEach((p) => {
      if (p.subject) set.add(p.subject);
    });
    return Array.from(set);
  }, [playlists]);

  const filteredPlaylists = useMemo(() => {
    return playlists.filter((p) => {
      const matchesSubject = selectedSubject
        ? p.subject === selectedSubject
        : true;
      const matchesSearch = searchQuery
        ? p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.channelName &&
            p.channelName.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
      return matchesSubject && matchesSearch;
    });
  }, [playlists, selectedSubject, searchQuery]);

  return (
    <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Tv className="text-red-500" size={28} />
            Video Resources & Playlists
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Curated YouTube playlists and video lectures to accelerate your
            preparation.
          </p>
        </div>
      </div>

      {/* Search & Subject Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            placeholder="Search playlists by topic, subject or channel..."
            className="pl-10 bg-white dark:bg-zinc-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {subjects.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              variant={selectedSubject === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubject(null)}
              className="text-xs h-8"
            >
              All Subjects
            </Button>
            {subjects.map((sub) => (
              <Button
                key={sub}
                variant={selectedSubject === sub ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSelectedSubject(sub === selectedSubject ? null : sub)
                }
                className="text-xs h-8"
              >
                {sub}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Video Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-primary" size={36} />
        </div>
      ) : filteredPlaylists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaylists.map((item) => {
            const thumbnail = getThumbnailUrl(item);
            const embed = getEmbedUrl(item);

            return (
              <Card
                key={item.id}
                className="overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video bg-zinc-900 overflow-hidden cursor-pointer">
                  <img
                    src={thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={20} className="fill-white ml-0.5" />
                    </div>
                  </div>

                  {item.videoCount && (
                    <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs gap-1">
                      <Tv size={12} />
                      {item.videoCount} Videos
                    </Badge>
                  )}

                  <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs gap-1 font-semibold">
                    <Youtube size={12} />
                    {item.subject}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-[var(--text-primary)] line-clamp-2 leading-snug group-hover:text-red-500 transition-colors">
                      {item.title}
                    </h3>
                    {item.channelName && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Sparkles size={12} className="text-amber-500" />
                        {item.channelName}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <DialogBox
                      TriggerBtnText="Watch Player"
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
                      className="gap-1 text-xs ml-auto hover:text-red-500"
                      onClick={() => window.open(item.playlistUrl, "_blank")}
                    >
                      Open in YT <ExternalLink size={12} />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-xl border-zinc-200 dark:border-zinc-800">
          <Tv className="mx-auto text-muted-foreground mb-3" size={40} />
          <h3 className="text-lg font-bold">No Video Playlists Found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or subject filter to find videos.
          </p>
        </div>
      )}
    </div>
  );
}
