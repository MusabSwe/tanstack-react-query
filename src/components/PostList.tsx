import { Button, ButtonGroup, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import { PostStatusType } from "../types";
import useSearch from "../hooks/useSearch";
import { useState } from "react";
interface PostListProps {
    selectedPostStatus: PostStatusType;
    searchQuery: string;
}
const PostList = ({ selectedPostStatus, searchQuery }: PostListProps) => {
    const [paginate, setPaginate] = useState(1);
    const { data, isLoading, isError, error, isStale, refetch, isFetching } = useGetPosts(selectedPostStatus,paginate);
    const { data: searchData, isLoading: isSearchLoading, isError: isSearchError, error: searchError } = useSearch(searchQuery);

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
        <>
            {/* Manual update */}
            {isStale && searchQuery.length === 0 &&
                <Button onClick={() => refetch()}>
                    Update Data
                </Button>}
            {isFetching && <span>Updating...</span>}
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
            {searchQuery.length === 0 && selectedPostStatus === "all" && (
                <ButtonGroup aria-label="Basic example">
                    {Array.from({ length: 3 }, (_, i) => (
                        <Button key={i} variant="light" className="" onClick={() => setPaginate(i + 1)}>
                            {i + 1}
                        </Button>
                    ))}
                </ButtonGroup>
            )}
        </>
    )
}

export default PostList;