import axios from 'axios';
import { useEffect, useState } from 'react';
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

const SlateContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
	width: 100%;
	max-width: 400px;
	border: 1px solid #333;
	border-radius: 30px;
	padding: 10px;
	background-color: #fff;
	color: black;
`;

const SlateName = styled.span`
	font-weight: bold;
	font-size: 32px;
	margin-bottom: 2px;
`;

const SlatePresident = styled.span`
	font-weight: bold;
	font-size: 18px;
	margin-bottom: 2px;
`;

const SlateVicePresident = styled.span`
	font-weight: bold;
	font-size: 18px;
	margin-bottom: 2px;
`;

function ConsultSlates() {
    const [slatesTable, setSlatesTable] = useState([]);
		useEffect(() => {
			axios
				.get('http://php.test/get_slates_table.php')
				.then((response) => {
					response.data.success !== false ? setSlatesTable(response.data) : '';
				})
				.catch((error) => {
					console.error(error);
				});
		}, []);
    const sortedSlates = slatesTable.sort((a, b) => a.slate_name.localeCompare(b.slate_name));
    return (
        <Container>
            <Title>Chapas Eleitorais</Title>
            {sortedSlates.map((slate) => (
                <SlateContainer key={slate.slate_code}>
                    <SlateName>
                        {slate.slate_name} - {slate.code}
                    </SlateName>
                    <SlatePresident>Presidente: {slate.president}</SlatePresident>
                    <SlateVicePresident>
                        Vice-Presidente: {slate.vice_president}
                    </SlateVicePresident>
                </SlateContainer>
            ))}
        </Container>
    );
}

export default ConsultSlates;
