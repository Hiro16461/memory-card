import Card from './Card';

export default function Board({ cards, onClick }) {
	return (
		<div className='layout'>
			{cards.map((card) => (
				<Card
					key={card.id}
					name={card.name}
					imgUrl={card.imgUrl}
                    clicked={card.clicked}
                    onClick={() => onClick(card.id)}
				/>
			))}
		</div>
	);
}
