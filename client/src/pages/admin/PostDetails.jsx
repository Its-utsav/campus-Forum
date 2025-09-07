import { useParams } from "react-router";
import { useEffect, useState } from "react";
import adminService from "../../services/admin.services";
import { Loading } from "../../components";

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    adminService.getPostById(postId).then(setPost);
  }, [postId]);

  return post ? (
    <div className="container mt-4">
      <h3>Post Details</h3>

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
  ) : (
    <Loading />
  );
}
