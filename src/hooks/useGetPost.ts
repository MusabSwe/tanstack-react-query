import axios from "axios";
import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { Post } from "../types";

const fetchData = async (id: string): Promise<Post> => {
    const response = await axios.get<Post>(`http://localhost:3005/posts/${id}`);
    return response.data;
}

export const useGetPost = (id: string, paramType: string, paramKey: string): UseQueryResult<Post> => {
    const queryCLient = useQueryClient();
    let getCachedData: Post[] | undefined;
    if (paramType === "paginate") {
        // convert to number since paginate is number and the key in the query is number and if we don't convert it to number it will not find the cached data since the key will be string and not number
        getCachedData = queryCLient.getQueryData(["posts", { "paginate": +paramKey, "selectedStatus": "all" }])
    }
    else if (paramType === "search") {
        getCachedData = queryCLient.getQueryData(["posts", "search", { "q": paramKey }])
    }
    return useQuery({
        queryKey: ["post", { id: +id }],
        queryFn: () => fetchData(id),
        initialData: () => {
            if (!getCachedData)
                return undefined; // if there is no cached data we return undefined to make the queryFn run and fetch the data from the api
            else {
                const result = getCachedData.find((post) => post.id === +id)
                return result; // if there is cached data we try to find the post with the same id in the cached data and return it as the initial data for the query, this will make the query return the cached data immediately and then it will fetch the data from the api in the background and update the cache and the component with the new data when it arrives, this is called stale-while-revalidate strategy
            }
        }
    })
}