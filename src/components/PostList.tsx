import { Button, ButtonGroup, Form, Table } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useGetPosts, { fetchPosts } from "../hooks/useGetPosts";
import { PostStatusType } from "../types";
import useSearch from "../hooks/useSearch";
import { useState, useEffect } from "react";
interface PostListProps {
    selectedPostStatus: PostStatusType;
    searchQuery: string;
}
const PostList = ({ selectedPostStatus, searchQuery }: PostListProps) => {
    const [paginate, setPaginate] = useState(1);
    const { data, isLoading, isError, error, isStale, refetch, isFetching } = useGetPosts(selectedPostStatus, paginate);
    const { data: searchData, isLoading: isSearchLoading, isError: isSearchError, error: searchError } = useSearch(searchQuery);

    const queryClient = useQueryClient();
    // prefetching the next page of posts data when the paginate state changes, this will make the next page load faster when the user clicks on it since it will be already cached
    useEffect(() => {
        const nextPage = paginate + 1;
        // make sure the key same as the one in useGetPosts and the queryFn also same as the one in useGetPosts to make sure it will be cached and used when we call it instead of making a new request
        if (nextPage > 3) return; // we have only 3 pages so we stop prefetching after page 3
        queryClient.prefetchQuery({
            queryKey: ["posts", { selectedStatus: 'all', paginate: nextPage }], // unique key for the query used for caching, we add selectedStatus to refetch (re-call the api ) when it changes since it's a dependency and if we don't add it here it will not refetch when it changes
            queryFn: () => fetchPosts('all', nextPage), // function that fetches the data used in the query
        });
    }, [paginate, queryClient])
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
    // useEffect should be added above the return statement since it's a hook and hooks should be called at the top level of the component and not inside any condition or loop, we get Unexpected Application Error!
    // Rendered more hooks than during the previous render.  
    // prefetching the next page of posts data when the paginate state changes, this will make the next page load faster when the user clicks on it since it will be already cached
    // useEffect(() => {
    //     const nextPage = paginate + 1;
    //     // make sure the key same as the one in useGetPosts and the queryFn also same as the one in useGetPosts to make sure it will be cached and used when we call it instead of making a new request
    //     if (nextPage > 3) return; // we have only 3 pages so we stop prefetching after page 3
    //     queryClient.prefetchQuery({
    //         queryKey: ["posts", { selectedStatus: 'all', paginate: nextPage }], // unique key for the query used for caching, we add selectedStatus to refetch (re-call the api ) when it changes since it's a dependency and if we don't add it here it will not refetch when it changes
    //         queryFn: () => fetchPosts('all', nextPage), // function that fetches the data used in the query
    //     });
    // }, [paginate, queryClient])

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