export default function Card({ name, imgUrl, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <img src={imgUrl} alt={name} />
            <p>{name}</p>
        </div>
    )
}