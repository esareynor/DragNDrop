import { useState, useCallback } from 'react';
import { Todo } from './Todo';
import { Badge, Button } from 'react-bootstrap';
import { FiPlusCircle } from 'react-icons/fi';

const PETS = [
	{ id: 1, name: 'dog' },
	{ id: 2, name: 'cat' },
	{ id: 3, name: 'fish' },
	{ id: 4, name: 'hamster' },
];

export const ListTodo = () => {
	const [pets, setPets] = useState(PETS);

	const movePetListItem = useCallback(
		(dragIndex, hoverIndex) => {
			const dragItem = pets[dragIndex];
			const hoverItem = pets[hoverIndex];
			// Swap places of dragItem and hoverItem in the pets array
			setPets((pets) => {
				const updatedPets = [...pets];
				updatedPets[dragIndex] = hoverItem;
				updatedPets[hoverIndex] = dragItem;
				return updatedPets;
			});
		},
		[pets],
	);

	return (
		<div className="p-4">
			<div
				className="p-4"
				style={{
					backgroundColor: '#F7FEFF',
					width: '25%',
					borderRadius: '4px',
					border: '1px solid #01959F',
				}}
			>
				<div className="mb-3">
					<Badge
						bg="light"
						style={{
							borderRadius: '4px',
							border: '1px solid #01959F',
							color: '#01959F',
						}}
					>
						Group Task 1
					</Badge>
					<h6 className="mt-3">January - March</h6>
				</div>
				{pets.map((pet, index) => (
					<Todo
						key={pet.id}
						index={index}
						text={pet.name}
						moveListItem={movePetListItem}
					/>
				))}
				<Button
					size="sm"
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#F7FEFF',
						borderColor: '#F7FEFF',
                        color:'#000',
                        marginTop:'5px',
					}}
				>
					<FiPlusCircle style={{ marginRight: '5px' }} />
					New Task
				</Button>
			</div>
		</div>
	);
};
