import { useState } from "react";
import { Navigate } from "react-router";
import answerService from "../services/answer.services";

export default function InlineAnswerBox({ postId }) {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await answerService.postAnswer({
        postId: postId,
        answerBody: { body: content },
      });
      setMessage("Answer posted !");
      setRedirect(true);
    } catch (err) {
      setMessage(err.message || "Failed to post answer.");
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to={`/posts/${postId}?refetch=true`} />;
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <textarea
            className="form-control border-primary"
            rows="3"
            placeholder="Write your answer..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Answer"}
          </button>
          {message && <small className="text-muted ms-3">{message}</small>}
        </div>
      </form>
    </div>
  );
}
