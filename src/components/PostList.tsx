import { Button, ButtonGroup, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
const PostList = () => {
    const {data:postsData, isLoading, isError, error} = useGetPosts();

    // Handle loading and error states and if it not exist will crash since postsData is undefined 
    if(isLoading){
        return <div>Loading...</div>
    }
    
    if(isError){
        return <div>Error loading posts {error?.message}</div>
    }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th style={{ width: "10%" }}>Top Rate</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    postsData?.map((post: any, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><Link to={"/info"}>{post.title}</Link></td>
                            <td style={{ textAlign: 'center' }}>
                                <Form.Check type="switch" checked={post.topRate} />
                            </td>
                            <td>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="danger">Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                }
                <tr>
                    <td>1</td>
                    <td>
                        <Link to="/info">lurem ipsum dollar asd sad </Link>
                    </td>
                    <td>Otto</td>
                    <td style={{ textAlign: "center" }}>
                        <Form.Check // prettier-ignore
                            type="switch"
                        />
                    </td>
                    <td>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="danger">Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}

export default PostList;