import { useSearchParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useGetPost } from "../hooks/useGetPost";
const Info = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const type = searchParams.get("type") as string;
  const key = searchParams.get("key") as string;
  const { data, isLoading, error, isError } = useGetPost(id, type, key);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading posts {error?.message}</div>
  }
  return (
    <Row>
      <Col xs={6}>
        <div>
          <h4>Title: {data?.title}</h4>
          <p>Status: {data?.status}</p>
          <p>Top Rate: {data?.topRate ? "true" : "false"}</p>
          <p>Body:  {data?.body}</p>
          <hr />
          <h4 className="mb-2">Comments:</h4>
          <p>Comment 1</p>
          <p>Comment 2</p>
        </div>
      </Col>
    </Row>
  );
};

export default Info;
