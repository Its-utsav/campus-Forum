import Button from "./Button";
import Link from "./Link";

/**
 *
 * @param {{postBody:{_id:string,body:string}}} props
 * @returns
 */
export default function CardComponents(props) {
  const { postBody } = props;
  return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">{postBody.body}</p>
        <Link href={`/posts/${postBody._id}`}>
          <Button className="btn btn-primary">Give answer</Button>
        </Link>
      </div>
    </div>
  );
}
