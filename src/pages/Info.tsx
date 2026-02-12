import { useSearchParams } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useGetPost } from "../hooks/useGetPost";
import { useState } from "react";
import { useAddComment } from "../hooks/useAddComment";

const Info = () => {
  const [comment, setComment] = useState<string>("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") as string;
  const type = searchParams.get("type") as string;
  const key = searchParams.get("key") as string;
  const { data, isLoading, error, isError } = useGetPost(id, type, key);

  const addComment = useAddComment();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment.mutate({
      body: comment,
      post_id: +id
    }, {
      onSuccess: () => {
        setComment("");
      }
    });
  }

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
        </div>
        <h4 className="mb-2">Comments:</h4>
        <Form className="mb-3" onSubmit={submitHandler}>
          <Form.Group controlId="comment">
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Button disabled={addComment.isPending} variant="primary" type="submit" className="mt-2">
            Submit Comment
          </Button>
        </Form>
        <h4 className="mb-2">Comments:</h4>
        <p>Comment 1</p>
        <p>Comment 2</p>
      </Col>
    </Row>
  );
};

export default Info;
