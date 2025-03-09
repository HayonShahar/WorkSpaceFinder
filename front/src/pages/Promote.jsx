import PlanCard from '../components/promote/PlanCard';
import '../styles/promote.css'

function Promote() {
    const plans = [
        {
            name: 'Basic',
            duration: '30 ימים',
            pricePerDay: '30 ש"ח',
            description: 'קידום העסק באתר למשך 30 ימים.',
        },
        {
            name: 'Premium',
            duration: '90 ימים',
            pricePerDay: '20 ש"ח',
            description: 'קידום העסק עם הטבות מיוחדות למשך 90 ימים.',
        },
        {
            name: 'Ultimate',
            duration: '180 ימים',
            pricePerDay: '10 ש"ח',
            description: 'המסלול המשתלם ביותר, קידום מקסימלי למשך 180 ימים.',
        },
    ];

    return (
        <div className='promote-container'>
            <div className="plans-section">
                <h2>בחר את המסלול שלך</h2>
                <div className="plans-container">
                    {plans.map((plan, index) => (
                        <PlanCard key={index} plan={plan} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Promote;