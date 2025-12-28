import { useEffect, useState } from 'react';

export default function Game() {
	const [cards, setCards] = useState([]);

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
			setCards(pockemonCards)
		};

		fetchPockemon();
	}, []);

	return <div></div>;
}
