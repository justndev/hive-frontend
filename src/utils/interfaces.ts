export interface Post {
    id: number,
    creatorId: number,
    creatorUsername: string,
    time: string,
    title: string,
    filename: string,
    content: string
}

export interface MessageDTO {
    id: number
    text: string
    sender: number
    receiver: number
    time: string
}

export interface IncomeDTO {
    id: number
    text: string
    username: string
    time: string
    img?: string
}

export interface UserDTO {
    img?: string,
    username: string,
    id: number,
    friend: boolean
}

export interface MessageProps {
    time: string,
    text: string,
    sender_id?: number,
    reciever_id?: number,
    isOnLeft: boolean
}

export interface SendedMessageDTO {
    text: string
    sender: number
    receiver: number
}

export interface UserDTO {
    id: number
    username: string
    friend: boolean
}

export interface MessageDTO {
    id: number
    text: string
    sender: number
    receiver: number
    time: string
}

export interface IncomeDTO {
    id: number
    text: string
    username: string
    time: string
}

export interface SocketResponse {
    update: string;
    objects: [];
}

export interface Post {
    id: number,
    creatorId: number,
    creatorUsername: string,
    time: string,
    title: string,
    filename: string,
    content: string,
}