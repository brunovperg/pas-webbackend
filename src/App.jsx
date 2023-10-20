/* eslint-disable no-mixed-spaces-and-tabs */
import './App.css';
import RegisterSlate from './Components/RegisterSlate';
import RegisterVote from './Components/RegisterVote';
import RegisterVoter from './Components/RegisterVoter';
import styled from 'styled-components';
import TotalVotes from './Components/TotalVotes';
import Button from './Components/Button';
import buttons from './buttons.json';
import { useState } from 'react';
import ConsultSlates from './Components/ConsultSlates';

const DarkBackground = styled.div`
	background-color: #fff;
	color: #000;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 3rem;
	margin-top: 2rem;
`;

const TitleContainer = styled.div`
	text-align: center;
`;
const Title = styled.h2`
	align-self: center;
	font-size: 2rem;
	margin-top: 1rem;
	margin-bottom: 1rem;
	color: #000;
`;

const ImageContainer = styled.div`
	justify-content: center;
	display: flex;
	width: 100%;
`;
const Logo = styled.img`
	margin-top: 3rem;
	width: 200px;
	margin-bottom: 3rem;
`;

function App() {
	const [activeButton, setActiveButton] = useState('');

	function renderActiveButton() {
		switch (activeButton) {
			case 'RegisterVoter':
				return <RegisterVoter />;
			case 'RegisterSlate':
				return <RegisterSlate />;
			case 'RegisterVote':
				return <RegisterVote />;
			case 'TotalVotes':
				return <TotalVotes />;
			case 'ConsultSlates':
				return <ConsultSlates />;
			default:
				return null;
		}
	}
	function buttonClick(button) {
		setActiveButton(button.name);
	}

	return (
		<DarkBackground>
			<TitleContainer>
				<Title>Sistema de Votação</Title>
			</TitleContainer>
			<ButtonContainer>
				{buttons.map((button) => {
					return (
						<Button
							key={button.name}
							text={button.description}
							onClick={() => buttonClick(button)}
							contents={button.contents}
						/>
					);
				})}
			</ButtonContainer>
			<ButtonContainer>
				{(activeButton === 'Registration') |
				(activeButton === 'RegisterVoter') |
				(activeButton === 'RegisterSlate')
					? Object.values(buttons[0].contents).map((button) => {
							return (
								<Button
									key={button.name}
									text={button.description}
									onClick={() => buttonClick(button)}
								/>
							);
					  })
					: ''}
			</ButtonContainer>
			{renderActiveButton()}
			<ImageContainer>
				<Logo src='/logo-unit.png' />
			</ImageContainer>
		</DarkBackground>
	);
}

export default App;
