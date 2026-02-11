import axios from "axios";
import { Post } from "../types"
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const fetchData = async (q: string): Promise<Post[]> => {
    const response = await axios.get("http://localhost:3005/posts", {
        params: { title_loke: q }
    });
    return response.data;
}
const useSearch = (q: string): UseQueryResult<Post[]> => {
    return useQuery({
        queryKey: ["posts", "search", { q }],
        queryFn: () => fetchData(q),
        staleTime: 5 * 60 * 1000,
        enabled: q.length > 0, // only run the query (call the API) if the query string is not empty 
    });
}

export default useSearch;