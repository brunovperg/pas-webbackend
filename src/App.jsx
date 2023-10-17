import './App.css';
import RegisterSlate from './Components/RegisterSlate';
import RegisterVote from './Components/RegisterVote';
import RegisterVoter from './Components/RegisterVoter';
import styled from 'styled-components';
import TotalVotes from './Components/TotalVotes';

const DarkBackground = styled.div`
	background-color: #1a1a1a;
	color: #fff;
`;

function App() {
	return (
		<DarkBackground>
			<RegisterVoter />
			<RegisterSlate />
			<RegisterVote />
			<TotalVotes />
		</DarkBackground>
	);
}

export default App;
