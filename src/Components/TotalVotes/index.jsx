import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Slate = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const SlateName = styled.span`
    font-weight: bold;
`;

const TotalVotesStyled = styled.span`
    font-weight: bold;
`;

function TotalVotes() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:80/php/get_votes.php')
            .then((response) => {
                setResults(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            teste
            {/* <h2>Vote Results</h2>
            <ul>
                {results.map((result) => (
                    <Slate key={result.slate_name}>
                        <SlateName>{result.slate_name}:</SlateName>
                        <TotalVotesStyled>{result.total_votes}</TotalVotesStyled>
                    </Slate>
                ))}
            </ul> */}
        </div>
    );
}

export default TotalVotes;
