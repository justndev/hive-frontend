import React, { useState, useRef, useEffect } from 'react';
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';
import { useAuth } from '../../utils/AuthContextProvider';
import { uploadPost } from '../../api/messengerApi';


// Form for adding a post. Similar to login/registration. It checks if input is valid and only then allow to upload
const AddPost = () => {
    const { token } = useAuth();

    const titleRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);

    const [title, setTitle] = useState('');
    const [validTitle, setValidTitle] = useState(false);
    const [titleFocus, setTitleFocus] = useState(false);

    const [content, setContent] = useState('');
    const [validContent, setValidContent] = useState(false);
    const [contentFocus, setContentFocus] = useState(false);

    const [file, setFile] = useState<File | null>(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const [errMsg, setErrMsg] = useState('');

    const TITLE_REGEX = /^.{3,50}$/;
    const CONTENT_REGEX = /^.{10,500}$/;


    useEffect(() => {
        if (titleRef.current) titleRef.current.focus();
    }, []);

    useEffect(() => {
        setValidTitle(TITLE_REGEX.test(title));
    }, [title]);

    useEffect(() => {
        setValidContent(CONTENT_REGEX.test(content));
    }, [content]);

    useEffect(() => {
        setErrMsg('');
    }, [title, content, file]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            if (!selectedFile.type.startsWith('image/')) {
                setErrMsg('Must be an image');
                setFile(null);
            } else {
                setFile(selectedFile);
                setErrMsg('');
            }
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!validTitle || !validContent) {
            setErrMsg('Invalid entry');
            return;
        }
        if (!file) {
            setErrMsg('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('content', content);

        try {
            const response = await uploadPost(formData, token)
            console.log('File uploaded successfully:', response);

            setTitle('');
            setContent('');
            setFile(null);
            setValidTitle(false);
            setValidContent(false);
            setFileInputKey(Date.now());
        } catch (error) {
            console.error('Error uploading file:', error);
            setErrMsg('Error uploading file');
        }
    };

    return (
        <div className="flex justify-center ">
            <section className="bg-[rgba(32,33,36,0.5)] p-5 rounded-3xl m-[100px] text-white shadow-2xl flex flex-col justify-center items-center">
                <p ref={errRef} className={errMsg ? 'errmsg text-[#E5AB4F]' : 'offscreen'} aria-live="assertive">
                    {errMsg}
                </p>
                <b className="m-5 text-2xl font-bold">ADD POST</b>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="relative flex items-center">
                        <input
                            id="title"
                            ref={titleRef}
                            autoComplete="off"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                            aria-invalid={validTitle ? 'false' : 'true'}
                            aria-describedby="titlenote"
                            onFocus={() => setTitleFocus(true)}
                            onBlur={() => setTitleFocus(false)}
                            className="bg-transparent border-b p-2 pr-8 focus:outline-none focus:ring-0"
                        />
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={`absolute right-2 ${validTitle ? 'text-green-500' : 'hidden'}`}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={`absolute right-2 ${validTitle || !title ? 'hidden' : 'text-red-500'}`}
                        />
                    </div>
                    <p
                        id="titlenote"
                        className={`text-xs mt-1 ${titleFocus && title && !validTitle ? 'text-gray-400' : 'hidden'}`}
                    >
                        <FontAwesomeIcon icon={faInfoCircle} /> 3 to 50 characters.
                    </p>
                    <div className="relative flex items-center mt-4">
                        <textarea
                            id="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            required
                            aria-invalid={validContent ? 'false' : 'true'}
                            aria-describedby="contentnote"
                            onFocus={() => setContentFocus(true)}
                            onBlur={() => setContentFocus(false)}
                            className="bg-transparent border-b p-2 pr-8 focus:outline-none focus:ring-0 w-full h-40"
                            placeholder="Content"
                        />
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={`absolute right-2 ${validContent ? 'text-green-500' : 'hidden'}`}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={`absolute right-2 ${validContent || !content ? 'hidden' : 'text-red-500'}`}
                        />
                    </div>
                    <p
                        id="contentnote"
                        className={`text-xs mt-1 ${contentFocus && !validContent ? 'text-gray-400' : 'hidden'}`}
                    >
                        <FontAwesomeIcon icon={faInfoCircle} /> 10 to 500 characters.
                    </p>

                    <div className="relative flex items-center mt-4 border-b">
                        <input
                            type="file"
                            id="image"
                            key={fileInputKey}
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="image"
                            className="cursor-pointer bg-[#YourDesiredColor] text-[#YourDesiredTextColor] px-4 py-2 rounded"
                        >
                            Browse...
                        </label>
                        <span className="ml-3 text-[#E5AB4F]">
                            {file?.name || "No file chosen"}
                        </span>
                    </div>

                    <button className="mt-5 btn-try">ADD POST</button>
                </form>
            </section>
        </div>
    );
};

export default AddPost;