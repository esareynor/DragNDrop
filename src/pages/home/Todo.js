import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Row, Col, ProgressBar, Button } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';

export const Todo = ({ text, index, moveListItem }) => {
	// useDrag - the list item is draggable
	const [{ isDragging }, dragRef] = useDrag({
		type: 'item',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	// useDrop - the list item is also a drop area
	const [spec, dropRef] = useDrop({
		accept: 'item',
		hover: (item, monitor) => {
			const dragIndex = item.index;
			const hoverIndex = index;
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

			// if dragging down, continue only when hover is smaller than middle Y
			if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
			// if dragging up, continue only when hover is bigger than middle Y
			if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

			moveListItem(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	// Join the 2 refs together into one (both draggable and can be dropped on)
	const ref = useRef(null);
	const dragDropRef = dragRef(dropRef(ref));

	// Make items being dragged transparent, so it's easier to see where we drop them
    const opacity = isDragging ? 0 : 1;
	return (
		<div ref={dragDropRef} className="p-2">
			<Row
				style={{
					border: 'solid 1px #E0E0E0',
					borderRadius: '5px',
					backgroundColor: '#FAFAFA',
				}}
			>
				<Col>
					<Row>
						<Col className="pt-3">
							<h6>{text}</h6>
						</Col>
					</Row>
                    <hr style={{border:'1px dashed #000'}} />
					<Row>
						<Col className="mt-1">
							<ProgressBar now={60} />
						</Col>
                        <Col className="pb-2" xs="auto">
                            <small>60%</small>
                        </Col>
						<Col className="pb-2 mb-2" xs="auto">
							<Button
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#FAFAFA',
									borderColor: '#FAFAFA',
									color: '#000',
								}}
							>
								<BsThreeDots />
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
};
