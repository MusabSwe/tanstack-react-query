import axios, { AxiosError } from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface ICommentPost {
    body: string;
    post_id: number;
}

interface ICommentResponse {
    id: number,
    body: string,
    post_id: number
}
const requestData = async (data: ICommentPost): Promise<ICommentResponse> => {
    const response = await axios.post("http://localhost:3005/comments", data);
    return response.data;
}

export const useAddComment = (): UseMutationResult<ICommentResponse, AxiosError, ICommentPost> => {
    return useMutation({
        mutationFn: requestData,
        onSuccess: () => {
            console.log("comment added successfully");
        },
    })
}