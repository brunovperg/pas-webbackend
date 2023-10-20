/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	ul {
		margin: 0;
		padding: 0;
	}
`;

const Title = styled.h2`
	font-size: 2rem;
	margin-bottom: 1rem;
	color: #000;
`;

const SlateContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
	gap: 15px;
`;

const Slate = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	background-color: #fff;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.9);
`;

const SlateName = styled.span`
	font-weight: bold;
	color: #333;
	font-size: 24px;
`;

const TotalVotesStyledContainer = styled.div`
	font-weight: bold;
	color: #333;
	text-align: center;
`;

function TotalVotes() {
	const [results, setResults] = useState([]);
	const [totalVotes, setTotalVotes] = useState(0);

	useEffect(() => {
		axios
			.get('http://php.test/get_votes.php')
			.then((response) => {
				response.data.success !== false ? setResults(response.data) : '';
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		const sum = results.reduce(
			(accumulator, result) => accumulator + Number(result.total_votes),
			0
		);
		setTotalVotes(sum);
	}, [results]);

	return (
		<Container>
			<Title>Resultados</Title>
			<h1>Total de votos: {totalVotes}</h1>
			<SlateContainer>
				{results
					.sort((a, b) => b.total_votes - a.total_votes) // sort by total_votes in descending order
					.map((result) => (
						<Slate key={result.slate_code}>
							<SlateName>
								{result.slate_name}
								{' - '}
								{result.slate_code}
							</SlateName>
							<TotalVotesStyledContainer>
								Votos: {result.total_votes} <br />
								{((Number(result.total_votes) / totalVotes) * 100).toFixed(2)}%
							</TotalVotesStyledContainer>
						</Slate>
					))}
			</SlateContainer>
		</Container>
	);
}

export default TotalVotes;
