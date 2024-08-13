import List from '@/app/components/List';
import activity from '@/app/data/data.json';



export default function Home() {
  return (
    <div>
    <List activity={activity} />

     
    </div>
  );
}
