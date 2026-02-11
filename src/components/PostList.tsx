import { Button, ButtonGroup, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import { PostStatusType } from "../types";
import useSearch from "../hooks/useSearch";
interface PostListProps {
    selectedPostStatus: PostStatusType;
    searchQuery: string;
}
const PostList = ({ selectedPostStatus, searchQuery }: PostListProps) => {
    const { data, isLoading, isError, error } = useGetPosts(selectedPostStatus);
    const { data: searchData, isLoading: isSearchLoading, isError: isSearchError, error: searchError, } = useSearch(searchQuery);

    // Handle loading and error states and if it not exist will crash since postsData is undefined 
    if (isLoading || isSearchLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading posts {error?.message}</div>
    }

    if (isSearchError) {
        return <div>Error loading posts {searchError?.message}</div>
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
                {searchQuery.length === 0 &&
                    data?.map((post: any, index: number) => (
                        <tr key={post.id}>
                            <td>{index + 1}</td>
                            <td><Link to={"/info"}>{post.title}</Link></td>
                            <td style={{ textAlign: 'center' }}>
                                <Form.Check type="switch" onChange={() => { }} checked={post.topRate} />
                            </td>
                            <td>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="danger">Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                }
                {searchQuery.length > 0 &&
                    searchData?.map((post: any, index: number) => (
                        <tr key={post.id}>
                            <td>{index + 1}</td>
                            <td><Link to={"/info"}>{post.title}</Link></td>
                            <td style={{ textAlign: 'center' }}>
                                <Form.Check type="switch" onChange={() => { }} checked={post.topRate} />
                            </td>
                            <td>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="danger">Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default PostList;