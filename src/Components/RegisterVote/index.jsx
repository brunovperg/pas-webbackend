import axios from 'axios';
import { useState, useEffect } from 'react';
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
	align-items: center;
`;

const Label = styled.label`
	display: flex;
	flex: 1;
	justify-content: space-between;
	align-items: center;
	font-size: 1.2rem;
	margin-bottom: 0.5rem;
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

const Select = styled.select`
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

const Option = styled.option`
	font-size: 1.2rem;
	color: #333;
`;

const Button = styled.button`
	padding: 0.5rem 1rem;
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

function RegisterVote() {
	const [registrationNumber, setRegistrationNumber] = useState('');
	const [selectedSlate, setSelectedSlate] = useState('');
	const [slates, setSlates] = useState([]);
	const [message, setMessage] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:80/php/get_slates.php')
			.then((response) => {
				console.log(response.data);
				setSlates(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post('http://localhost:80/php/new_vote.php', {
				registration_number: registrationNumber,
				slate_code: selectedSlate,
			})
			.then((response) => {
				console.log(response.data);
				setMessage('Voto registrado com sucesso!');
				setRegistrationNumber('');
				setSelectedSlate('');
			})
			.catch((error) => {
				console.error(error);
				setMessage('Erro ao registrar o voto / Eleitor já votou!');
			});
	};

	return (
		<Container>
			<Title>Registro de Voto</Title>
			<Form onSubmit={handleSubmit}>
				<Label>
					Matrícula:
					<Input
						type='text'
						value={registrationNumber}
						onChange={(e) => setRegistrationNumber(e.target.value)}
					/>
				</Label>
				<Label>
					Chapa:
					<Select
						value={selectedSlate}
						onChange={(e) => setSelectedSlate(e.target.value) & console.log(selectedSlate) }>
						<Option value=''>Selecione uma chapa</Option>
						{slates.map((slate) => (
							<Option key={slate.code} value={slate.code}>
								{slate.name} - {slate.code}
							</Option>
						))}
					</Select>
				</Label>
				<Button type='submit'>Registrar</Button>
			</Form>
			{message && <Message>{message}</Message>}
		</Container>
	);
}

export default RegisterVote;
