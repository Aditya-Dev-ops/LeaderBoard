import { useSelector } from 'react-redux';
import { useClaimPointsMutation } from '../api/UserApi';
import type { RootState } from "../store";
import Loader from './Loader';

const ClaimButton = ({ selectedUserId}:{selectedUserId:string}) => {
  const [claimPoints,{isLoading  }] = useClaimPointsMutation();
  const user= useSelector((state: RootState) => state.auth.user);
  console.log(user);
  if(!user) return ;
  const handleClaim = async () => {
    if (!selectedUserId) return alert("Please select a user first!");
    const randomPoints = Math.floor(Math.random() * 11);
    const result = await claimPoints({claimedBy:selectedUserId , awardedBy:user._id ,claimedPoints:randomPoints });
    console.log("Points claimed:", result);
  };

  return (
    <button
      onClick={handleClaim}
      className=" bg-green-600 text-white px-4 py-2 rounded w-40"
      >
      {isLoading?<Loader/>:"Claim Button"}
    </button>
  );
};

export default ClaimButton;