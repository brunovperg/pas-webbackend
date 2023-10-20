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
	@media (max-width: 487px) {
		max-width: 90%;
	}
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

function RegisterVoter() {
	const [name, setName] = useState(undefined);
	const [registrationNumber, setRegistrationNumber] = useState(undefined);
	const [message, setMessage] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post('http://php.test/new_voter.php', {
				name: name,
				registration_number: registrationNumber,
			})
			.then((response) => {
				
				{
					response.data.success === true
						? setMessage('Eleitor registrado com sucesso!') &
						  setRegistrationNumber('') &
						  setName('')
						: setMessage('Erro ao registrar eleitor / Eleitor já cadastrado!');
				}
			})
			.catch((error) => {
				console.error(error);
				setMessage('Erro ao registrar o eletor!');
			});
	};

	return (
		<Container>
			<Title>Registro Eleitor</Title>
			<Form onSubmit={handleSubmit}>
				<Label htmlFor='name'>
					Nome:
					<Input
						id='name'
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Label>
				<Label htmlFor='registrationNumber'>
					Matrícula:
					<Input
						id='registrationNumber'
						type='text'
						value={registrationNumber}
						onChange={(e) => setRegistrationNumber(e.target.value)}
					/>
				</Label>
				<Button type='submit'>Registrar</Button>
			</Form>
			{message && <Message>{message}</Message>}
		</Container>
	);
}

export default RegisterVoter;
