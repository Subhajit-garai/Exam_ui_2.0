import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@repo/design-system/card";
import { motion } from "motion/react";
import { Book, FileText } from "lucide-react";

const colors = [
  { bg: "bg-blue-500/10", text: "text-blue-500" },
  { bg: "bg-purple-500/10", text: "text-purple-500" },
  { bg: "bg-emerald-500/10", text: "text-emerald-500" },
  { bg: "bg-orange-500/10", text: "text-orange-500" },
  { bg: "bg-pink-500/10", text: "text-pink-500" },
  { bg: "bg-indigo-500/10", text: "text-indigo-500" },
  { bg: "bg-cyan-500/10", text: "text-cyan-500" },
  { bg: "bg-rose-500/10", text: "text-rose-500" },
];

const getColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const SubjectListCard = ({
  data,
  link,
}: {
  data: any;
  link?: string;
}) => {
  const navigate = useNavigate();
  const color = getColor(data.name || "");

  const handleClick = () => {
    navigate(link || `/notes/${data.slug && data.slug}`);
  };
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card
        className="p-4 h-full flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
        onClick={handleClick}
      >
        <div className={`p-3 rounded-xl ${color.bg} ${color.text}`}>
          <Book size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-lg line-clamp-2">
            {data.name}
          </h3>
        </div>
      </Card>
    </motion.div>
  );
};

export const TopicListCard = ({ data, link }: { data: any; link?: string }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const color = getColor(data.name || "");

  const handleClick = () => {
    navigate(link || `/notes/${category}/${data.slug}`);
  };
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card
        className="p-4 h-full flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
        onClick={handleClick}
      >
        <div className={`p-3 rounded-xl ${color.bg} ${color.text}`}>
          <FileText size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-lg line-clamp-2">
            {data.name}
          </h3>
        </div>
      </Card>
    </motion.div>
  );
};
