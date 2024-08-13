import Card from './Card';

interface activity {
  id: number;
  name: string;
  image: string;
  price: number;
  features: string[];
  description: string;
}

interface ListCardsProps {
  activity: activity[];
}

export default function List({activity} : ListCardsProps) {
  return (
    <section className='p-3'>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 p-3">
        {activity.map((item, index) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      
    </section>
  )
}
