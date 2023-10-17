import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.h2`
	font-size: 2rem;
	margin-bottom: 1rem;
	color: #fff;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	padding: 2rem;
	background-color: #fff;
	border-radius: 1rem;
	box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
	align-items: flex-start;
`;

const Label = styled.label`
	display: flex;
	flex-direction: column;
	font-size: 1.2rem;
	margin-bottom: 0.5rem;
	margin-top: 1rem;
	width: 100%;
	color: #333;
`;

const Input = styled.input`
	padding: 0.5rem;
	margin-left: 1rem;
	border: none;
	border-radius: 0.5rem;
	box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
	font-size: 1.2rem;
	color: #333;
	&:focus {
		outline: none;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
	}
`;

const Button = styled.button`
	padding: 0.5rem 1rem;
	align-self: center;
	background-color: #0077cc;
	color: #fff;
	border: none;
	border-radius: 0.5rem;
	box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
	cursor: pointer;
	font-size: 1.2rem;
	transition: all 0.2s ease-in-out;
	&:hover {
		background-color: #005ea8;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
	}
`;

const Message = styled.p`
	font-size: 1.2rem;
	margin-top: 1rem;
	color: #FFF;
`;

function RegisterSlate() {
	const [slateName, setSlateName] = useState('');
	const [slateCode, setSlateCode] = useState('');
	const [presidentName, setPresidentName] = useState('');
	const [vicePresidentName, setVicePresidentName] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post('http://localhost:80/php/new_slate.php', {
				name: slateName,
				code: slateCode,
				president: presidentName,
				vice_president: vicePresidentName,
			})
			.then((response) => {
				console.log(response.data);
				setMessage('Chapa registrada com sucesso!');
				setSlateName('');
				setSlateCode('');
				setPresidentName('');
				setVicePresidentName('');
			})
			.catch((error) => {
				console.error(error);
				setMessage('Erro ao registrar a chapa!');
			});
	};

	return (
		<Container>
			<Title>Registro de Chapa Eleitoral</Title>
			<Form onSubmit={handleSubmit}>
				<Label htmlFor="slateName">
					Nome da Chapa:
					<Input
						id="slateName"
						type='text'
						value={slateName}
						onChange={(e) => setSlateName(e.target.value)}
					/>
				</Label>
				<Label htmlFor="slateCode">
					Código da Chapaaaaaaaaaaaaa:
					<Input
						id="slateCode"
						type='text'
						value={slateCode}
						onChange={(e) => setSlateCode(e.target.value)}
					/>
				</Label>
				<Label htmlFor="presidentName">
					Presidente:
					<Input
						id="presidentName"
						type='text'
						value={presidentName}
						onChange={(e) => setPresidentName(e.target.value)}
					/>
				</Label>
				<Label htmlFor="vicePresidentName">
					Vice-Presidente:
					<Input
						id="vicePresidentName"
						type='text'
						value={vicePresidentName}
						onChange={(e) => setVicePresidentName(e.target.value)}
					/>
				</Label>
				<Button type='submit'>Registrar</Button>
			</Form>
			{message && <Message>{message}</Message>}
		</Container>
	);
}

export default RegisterSlate;
