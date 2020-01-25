import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Input, Button } from "./Login";
import fetcher from '../utils/fetch';
import { IArticle } from './ArticleView';

const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const FlexContainerColumn = styled.div`
    flex-direction: column;
`;
const Row = styled(Link)`
    display: flex;
    background: #e3e3e3;
    transition: background-color .35s;

    & > div {
        flex: 1;
        padding: 5px;
    }

    &:hover {
        background: #d3d3d3;
    }
`;

export default function() {
    const [phrase, setPhrase] = useState<string>("")
    const [articles, setArticles] = useState<IArticle[]>([]);
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhrase(e.target.value);
    }
    const handleOnClick = () => {
        const url = `/articles?q=${phrase}`;
        fetcher(url)
        .then(setArticles);
    }
    return (
        <div>
            <FlexContainer>
                <Input value={phrase} onChange={handleOnChange} />
                <Button onClick={handleOnClick}>Search</Button>
            </FlexContainer>
            <FlexContainerColumn>
                {!!articles.length && (
                    <Row to="/">
                        <div>Author</div>
                        <div>Title</div>
                        <div>Key words</div>
                    </Row>
                )}
                {!!articles.length && articles.map(a => {
                    return (
                        <Row key={a._id} to={`/articles/${a._id}`}>
                            <div>{a.author}</div>
                            <div>{a.title}</div>
                            <div>{a.keyWords}</div>
                        </Row>
                    )
                })}
            </FlexContainerColumn>
        </div>
    )
}