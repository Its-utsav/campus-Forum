import { useEffect, useState } from "react";
import { useParams } from "./Route";
import postService from "../services/post.services";

export default function Post() {
  const { postID } = useParams();
  const [postData, setPostData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const data = await postService.getAPost(postID);
      setPostData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>{postID}</h1>;
    </>
  );
}
