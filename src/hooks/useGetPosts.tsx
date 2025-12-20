import axios from "axios"
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Post, PostStatusType } from "../types";

// function to fetch posts data from the API, returns a promise that resolves to an array of Post
const fetchPosts = async (selectedStatus: PostStatusType): Promise<Post[]> => {
  if (selectedStatus === 'all') {
    // Make a GET request to the API endpoint to fetch posts data, specifying the expected response type
    const result = await axios.get<Post[]>("http://localhost:3005/posts")
    return result.data;
  } else {
    const result = await axios.get<Post[]>("http://localhost:3005/posts?status=" + selectedStatus)
    return result.data;
  }

}

// custom hook to get posts data, UseQueryResult<Post[]> defines the return type of the hook
const useGetPosts = (selectedStatus: PostStatusType): UseQueryResult<Post[]> => {
  return useQuery({ // start caching with useQuery
    queryKey: ["posts", { selectedStatus }], // unique key for the query used for caching, we add selectedStatus to refetch (re-call the api ) when it changes since it's a dependency and if we don't add it here it will not refetch when it changes
    queryFn: () => fetchPosts(selectedStatus), // function that fetches the data used in the query 
    staleTime: 15 * 1000, // data is considered fresh for 15 seconds (if the call within this time it will use the cached data instead of making a new request)
  });
}

export default useGetPosts