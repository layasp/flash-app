import FlashCard from '../components/FlashCard';

export const Home = ()=>{
    const flashCardSet = [
        { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },

    ];
    return(
        <>
            <h1>Flash Card App</h1>
            <div className="flashcard">
            {flashCardSet.map((card, index) => (
                <FlashCard key={index} question={card.question} answer={card.answer} />
            ))}
            </div>
        </>
    )
}