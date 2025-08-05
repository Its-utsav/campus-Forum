import { useEffect, useState } from "react";
import postService from "../services/post.services";
import CardComponents from "../components/CardComponents";
import Loading from "../components/Loading";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPost] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await postService.getAllPost();
        setPosts(res);
      } catch (error) {
        console.log(error);
        setMessage(error.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTotalPost(posts.length);
  }, [posts]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <p className="text-center mt-2">
            Total{" "}
            <span className="rounded-2 p-1 badge text-bg-primary">
              {totalPost}
            </span>{" "}
            {totalPost === 1 ? "post" : "posts"} found
          </p>

          {posts.map((post) => (
            <div key={post._id}>
              <CardComponents key={post._id} postBody={post} />
            </div>
          ))}
        </>
      )}
    </>
  );
}
