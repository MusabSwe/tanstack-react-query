// Import axios for making HTTP requests and AxiosError for type-safe error handling
import axios, { AxiosError } from "axios";
// Import useMutation hook and its return type from TanStack React Query
// for managing server mutations and
import { useMutation, UseMutationResult } from "@tanstack/react-query";

/**
 * Interface representing the data structure needed to create a new comment
 * @property {string} body - The text content of the comment
 * @property {number} post_id - The ID of the post to which the comment is being added
 */
interface ICommentPost {
    body: string;
    post_id: number;
} 

/**
 * Interface representing the response data returned from the server after creating a comment
 * @property {number} id - The unique identifier of the created comment
 * @property {string} body - The text content of the comment
 * @property {number} post_id - The ID of the post the comment belongs to
 */
interface ICommentResponse {
    id: number,
    body: string,
    post_id: number
}

/**
 * Async function that makes a POST request to add a comment to a post
 * @param {ICommentPost} data - The comment data containing body and post_id
 * @returns {Promise<ICommentResponse>} - The server response with the created comment details
 */
const requestData = async (data: ICommentPost): Promise<ICommentResponse> => {
    const response = await axios.post("http://localhost:3005/comments", data);
    return response.data;
}

/**
 * Custom hook that provides mutation functionality to add a comment to a post
 * Uses TanStack React Query's useMutation for managing the async comment creation request
 * 
 * @returns {UseMutationResult<ICommentResponse, AxiosError, ICommentPost>} - An object with mutation methods and state:
 *   - mutate: Function to trigger the mutation
 *   - mutateAsync: Async version of mutate
 *   - isPending: Whether the request is in progress
 *   - isError: Whether the request failed
 *   - isSuccess: Whether the request succeeded
 *   - data: The response data if successful
 *   - error: The error if the request failed
 */
export const useAddComment = (): UseMutationResult<ICommentResponse, AxiosError, ICommentPost> => {
    /**
     * useMutation configuration:
     * - mutationFn: The async function to execute when the mutation is triggered
     * - onSuccess: Callback that runs when the mutation completes successfully
     */
    return useMutation({
        mutationFn: requestData, // mut use
    })
}