/* eslint-disable no-mixed-spaces-and-tabs */
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
	color: #000;
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
	color: #000;
`;

function RegisterSlate() {
	const [slateName, setSlateName] = useState(undefined);
	const [slateCode, setSlateCode] = useState(undefined);
	const [presidentName, setPresidentName] = useState(undefined);
	const [presidentRegistration, setPresidentRegistration] = useState(undefined);
	const [vicePresidentName, setVicePresidentName] = useState(undefined);
	const [vicePresidentRegistration, setvicePresidentRegistration] = useState(undefined);
	const [message, setMessage] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post('http://php.test/new_slate.php', {
				slate_name: slateName,
				code: slateCode,
				president: presidentName,
				president_registration_number: presidentRegistration,
				vice_president: vicePresidentName,
				vice_president_registration_number: vicePresidentRegistration,
			})
			.then((response) => {
				{
					response.data.success === true
						? 
						  setMessage('Chapa registrada com sucesso!') &
						  setSlateName('') &
						  setSlateCode('') &
						  setPresidentName('') &
						  setPresidentRegistration('') &
						  setVicePresidentName('') &
						  setvicePresidentRegistration('')
						: setMessage('Erro ao registrar a chapa / Chapa já cadastrada');
				}
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
				<Label htmlFor='slateName'>
					Nome da Chapa:
					<Input
						id='slateName'
						type='text'
						value={slateName}
						onChange={(e) => setSlateName(e.target.value)}
					/>
				</Label>
				<Label htmlFor='slateCode'>
					Código da Chapa:
					<Input
						id='slateCode'
						type='text'
						value={slateCode}
						onChange={(e) => setSlateCode(e.target.value)}
					/>
				</Label>
				<Label htmlFor='presidentName'>
					Presidente:
					<Input
						id='presidentName'
						type='text'
						value={presidentName}
						onChange={(e) => setPresidentName(e.target.value)}
					/>
				</Label>
				<Label htmlFor='presidentRegistration'>
					Matrícula do Presidente:
					<Input
						id='presidentRegistration'
						type='text'
						value={presidentRegistration}
						onChange={(e) => setPresidentRegistration(e.target.value)}
					/>
				</Label>
				<Label htmlFor='vicePresidentName'>
					Vice-Presidente:
					<Input
						id='vicePresidentName'
						type='text'
						value={vicePresidentName}
						onChange={(e) => setVicePresidentName(e.target.value)}
					/>
				</Label>
				<Label htmlFor='vicePresidentRegistration'>
					Matrícula do Vice-Presidente:
					<Input
						id='vicePresidentRegistration'
						type='text'
						value={vicePresidentRegistration}
						onChange={(e) => setvicePresidentRegistration(e.target.value)}
					/>
				</Label>
				<Button type='submit'>Registrar</Button>
			</Form>
			{message && <Message>{message}</Message>}
		</Container>
	);
}

export default RegisterSlate;
