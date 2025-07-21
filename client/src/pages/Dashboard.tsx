import { useState } from 'react';
import UserSelector from '../components/UserSelector';
import ClaimButton from '../components/ClaimButton';
import Leaderboard from '../components/LeaderBoard';

const Dashboard = () => {
  const [selectedUserId, setSelectedUserId] = useState('');

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏆 Leaderboard Dashboard</h1>
     <div className='flex w-full justify-center gap-2 items-center '>
      <UserSelector selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />
      <ClaimButton  selectedUserId={selectedUserId} />
     </div>
      <Leaderboard />
    </div>
  );
};

export default Dashboard;
