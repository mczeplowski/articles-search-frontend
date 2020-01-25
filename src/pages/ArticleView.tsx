import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from './Login';
import fetcher from '../utils/fetch';

const Label = styled.span`
    font-weight: bold;
    font-size: 1.1rem;
`;

export interface IArticle {
    _id: string;
    title: string;
    keyWords: string;
    content: string;
    author: string;
}

export default function(props: any) {
    const [article, setArticle] = useState<IArticle | null>(null);
    const { id } = props.match.params;
    const tokenData = localStorage.getItem('tokenData') || "";
    const userRole = JSON.parse(tokenData).role;

    const handleOnDelete = () => {
        fetcher(`/articles/${id}`, { method: "DELETE" }, true)
            .then(data => {
                console.log(data);
            })
    }

    useEffect(() => {
        fetcher(`/articles/${id}`)
            .then(data => setArticle(data))
    }, [])
    return !article ? (
        <div>Loading...</div>
    ) : (
        <div>
            {
                userRole === 'ADMIN' && (
                    <div>
                        <Label>Actions: </Label>
                        <Button>Edit</Button>
                        <Button onClick={handleOnDelete}>Delete</Button>
                    </div>
                )
            }
            <p>
                <Label>Author: </Label>
                <span>{article.author}</span>
            </p>
            <p>
                <Label>Title: </Label>
                <span>{article.title}</span>
            </p>
            <p>
                <Label>Key words: </Label>
                <span>{article.keyWords}</span>
            </p>
            <p>
                <Label>Content: </Label>
                <span>{article.content}</span>
            </p>
        </div>
    )
}