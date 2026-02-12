import axios from "axios"
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Post, PostStatusType } from "../types";

// function to fetch posts data from the API, returns a promise that resolves to an array of Post
export const fetchPosts = async (selectedStatus: PostStatusType, paginate: number): Promise<Post[]> => {
  if (selectedStatus === 'all') {
    // Make a GET request to the API endpoint to fetch posts data, specifying the expected response type
    const result = await axios.get<Post[]>(`http://localhost:3005/posts?_page=${paginate}&_limit=5`)
    return result.data;
  } else {
    const result = await axios.get<Post[]>("http://localhost:3005/posts?status=" + selectedStatus)
    return result.data;
  }

}

// custom hook to get posts data, UseQueryResult<Post[]> defines the return type of the hook
const useGetPosts = (selectedStatus: PostStatusType, paginate: number): UseQueryResult<Post[]> => {
  return useQuery({ // start caching with useQuery
    queryKey: ["posts", { selectedStatus, paginate }], // unique key for the query used for caching, we add selectedStatus to refetch (re-call the api ) when it changes since it's a dependency and if we don't add it here it will not refetch when it changes
    queryFn: () => fetchPosts(selectedStatus, paginate), // function that fetches the data used in the query 
    staleTime: 60 * 1000 * 1, // data is considered fresh for 1 min (if the call within this time it will use the cached data instead of making a new request)
    refetchInterval: 60 * 1000 * 2, // automatically refetch data every 2 minutes (if the component is mounted and the query is active)
      // refetchOnWindowFocus: true, // refetch data when the window regains focus (e.g., when the user switches back to the tab)
      // refetchOnReconnect: true, // refetch data when the browser regains network connectivity
  });
}

export default useGetPosts