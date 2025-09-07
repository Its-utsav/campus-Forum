import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import postService from "../services/post.services";
import { InlineAnswerBox, Loading } from "../components";

export default function PostInfo() {
  const { postId } = useParams();

  console.log(useLocation());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({
    answers: [
      {
        autherInfo: { _id: "6873c36d7ca6107e8fe90391", username: "utsav" },
        authorId: "6873c36d7ca6107e8fe90391",
        content: "on ground floor 🤗",
        postId: "6873c3a17ca6107e8fe9039f",
        _id: "6873c48c6277ae70771b01ee",
      },
    ],
    authorInfo: {},
    totalAnswer: -1,
    question: "",
    rest: {},
  });

  useEffect(() => {
    const fetchPost = async () => {
      postService
        .getAPost(postId)
        .then((data) => {
          setPost({
            answers: data.answers,
            authorInfo: data.authorInfo,
            totalAnswer: data.totalAnswer,
            question: data.body,
            rest: { ...data },
          });
          setLoading(false);
        })
        .catch((reason) => setMessage(reason.message))
        .finally(() => {
          setLoading(false);
        });
    };
    fetchPost();
  }, [postId]);
  console.log(postId);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container my-4">
      {message && <div className="alert alert-danger">{message}</div>}

      <div className="card shadow-sm border-primary">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Question</h5>
        </div>
        <div className="card-body bg-white">
          <p className="fs-5">{post.question}</p>
          <p className="text-muted mb-1">
            <strong>Author:</strong> {post.authorInfo.username}
          </p>
          <p className="text-muted">
            <strong>Total Answers:</strong> {post.totalAnswer}
          </p>
        </div>
      </div>
      <InlineAnswerBox postId={postId} />
      <div className="mt-4">
        <h5 className="text-primary">Answers</h5>
        {post.answers.length > 0 ? (
          post.answers.map((data, index) => (
            <div key={index} className="card mb-3 border-light shadow-sm">
              <div className="card-body">
                <p className="mb-1">{data.content}</p>
                <small className="text-muted">
                  — {data.autherInfo?.username}
                </small>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No answers yet.</p>
        )}
      </div>
    </div>
  );
}
