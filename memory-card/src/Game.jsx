import { useEffect, useState } from 'react';
import Score from './Score';
import Board from './Board';

export default function Game() {
	const [cards, setCards] = useState([]);
	const [bestScore, setBestScore] = useState(0);
	const currentScore = cards.filter((card) => card.clicked).length;

	useEffect(() => {
		const fetchPockemon = async () => {
			const ids = [6, 8, 12, 14, 16, 21, 26, 35, 66, 67, 100, 120];
			const promises = ids.map((id) =>
				fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
					res.json()
				)
			);

			const results = await Promise.all(promises);

			const pockemonCards = results.map((pockemon) => ({
				id: pockemon.id,
				name: pockemon.name,
				imgUrl: pockemon.sprites.front_default,
				clicked: false,
			}));
			console.log(pockemonCards);
			setCards(pockemonCards);
		};

		fetchPockemon();
	}, []);

	function shuffle(cardsToShuffle) {
		let currentIndex = cardsToShuffle.length;
		let newCards = [...cardsToShuffle];

		while (currentIndex !== 0) {
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[newCards[currentIndex], newCards[randomIndex]] = [
				newCards[randomIndex],
				newCards[currentIndex],
			];
		}
		return newCards;
	}

	function handleCardClick(id) {
		setCards((prevCards) => {
			const clickedCard = prevCards.find((card) => card.id === id);

			if (clickedCard.clicked) {
				setBestScore((prevBest) =>
					currentScore > prevBest ? currentScore : prevBest
				);

				return shuffle(
					prevCards.map((card) => ({
						...card,
						clicked: false,
					}))
				);
			}

			const updatedCards = prevCards.map((card) =>
				card.id === id ? { ...card, clicked: true } : card
			);
			return shuffle(updatedCards);
		});
	}

	return (
		<div>
			<h1>Memory card game</h1>
			<Score currentScore={currentScore} bestScore={bestScore} />
			<Board cards={shuffle(cards)} onClick={handleCardClick} />
		</div>
	);
}
