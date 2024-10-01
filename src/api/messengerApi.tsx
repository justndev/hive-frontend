import axios, { AxiosRequestConfig } from "axios";
import { Post, UserDTO, SendedMessageDTO, MessageDTO, IncomeDTO } from "../utils/interfaces";

const BASE_URL = 'http://localhost:8080';

const getHeaders = (jwt: string): AxiosRequestConfig => ({
    headers: {
        Authorization: `Bearer ${jwt}`
    }
});

const getPosts = async (jwt: string): Promise<Post[]> => {

    const response = await axios.get<Post[]>(`${BASE_URL}/api/messenger/posts`, getHeaders(jwt));
    return response.data.reverse();
};

const getPost = async (postId: number, jwt: string): Promise<Post> => {

    const response = await axios.get<Post>(`${BASE_URL}/api/messenger/post`,
        {
            params: { postId: postId },
            ...getHeaders(jwt)
        }
    );
    return response.data;
};

const getImageByFilename = async (filename: string, jwt: string) => {
    const response = await axios.get(`${BASE_URL}/api/messenger/files/${filename}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    return URL.createObjectURL(blob);
}

const uploadPost = async (formData: any, jwt: string) => {
    const response = await axios.post('http://localhost:8080/api/messenger/post', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${jwt}`
        },
    });

    return response.data
}

const findContactByUsername = async (username: string, jwt: string): Promise<UserDTO> => {
    const response = await axios.get<UserDTO>(`${BASE_URL}/api/messenger/contact?username=${username}`, getHeaders(jwt));
    return response.data;
};

const getContacts = async (jwt: string): Promise<UserDTO[]> => {
    const response = await axios.get<UserDTO[]>(`${BASE_URL}/api/messenger/contacts`, getHeaders(jwt));
    return response.data;
};

const sendFriendRequest = async (requestedId: number, jwt: string): Promise<void> => {
    await axios.post(`${BASE_URL}/api/messenger/request?requestedId=${requestedId}`, '', getHeaders(jwt));
};

const getRequests = async (jwt: string): Promise<UserDTO[]> => {
    const response = await axios.get<UserDTO[]>(`${BASE_URL}/api/messenger/requests`, getHeaders(jwt));
    return response.data;
};

const acceptRequest = async (requestedId: number, jwt: string): Promise<void> => {
    await axios.post(`${BASE_URL}/api/messenger/request-accept?requestedId=${requestedId}`, '', getHeaders(jwt));
};

const declineRequest = async (requestedId: number, jwt: string): Promise<void> => {
    await axios.post(`${BASE_URL}/api/messenger/request-deny?requestedId=${requestedId}`, '', getHeaders(jwt));
};

const sendMessage = async (message: SendedMessageDTO, jwt: string): Promise<void> => {
    await axios.post(`${BASE_URL}/api/messenger/messages`, message, getHeaders(jwt));
};

const getMessages = async (requestedId: number, jwt: string): Promise<MessageDTO[]> => {
    const response = await axios.get<MessageDTO[]>(`${BASE_URL}/api/messenger/messages?requestedId=${requestedId}`, getHeaders(jwt));
    console.log(requestedId)
    return response.data;
};

const getChats = async (jwt: string): Promise<IncomeDTO[]> => {
    const response = await axios.get<IncomeDTO[]>(`${BASE_URL}/api/messenger/chats`, getHeaders(jwt));
    return response.data;
};

export {
    getPost,
    getPosts,
    getImageByFilename,
    findContactByUsername,
    getContacts,
    sendFriendRequest,
    getRequests,
    acceptRequest,
    declineRequest,
    sendMessage,
    getMessages,
    getChats,
    uploadPost
};