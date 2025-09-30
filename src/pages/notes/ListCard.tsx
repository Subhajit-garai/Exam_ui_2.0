import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@repo/design-system/card";

export const SubjectListCard = ({ data, link }: { data:any; link?:string }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link || `/notes/${data.slug && data.slug}`);
  };
  return (
    <>
      <div className="">
        <Card  onClick={handleClick}>
          <p>{data.name}</p>
        </Card>
      </div>
    </>
  );
};

export const TopicListCard = ({ data, link }:{data:any, link?:string }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(`/notes/${category}/${data.slug}`);

    navigate(link || `/notes/${category}/${data.slug}`);
  };
  return (
    <>
      <div>
        <Card  onClick={handleClick}>
          <p>{data.name}</p>
        </Card>
      </div>
    </>
  );
};
