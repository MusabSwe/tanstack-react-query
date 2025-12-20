import axios from "axios"
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  status: "Publish" | "Draft" | "Blocked";
  topRate: boolean;
}
// function to fetch posts data from the API, returns a promise that resolves to an array of Post
const fetchPosts = async (): Promise<Post[]> => {
  // Make a GET request to the API endpoint to fetch posts data, specifying the expected response type
  const result = await axios.get<Post[]>("http://localhost:3005/posts")
  return result.data;
}

// custom hook to get posts data, UseQueryResult<Post[]> defines the return type of the hook
const useGetPosts = (): UseQueryResult<Post[]> => {
  return useQuery({ // start caching with useQuery
    queryKey: ["posts"], // unique key for the query used for caching
    queryFn: fetchPosts, // function that fetches the data used in the query 
    staleTime: 5 * 1000, // data is considered fresh for 5 seconds
  });
}

export default useGetPosts