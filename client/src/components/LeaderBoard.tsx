// import {  useState } from "react";
// import { useGetLeaderboardQuery } from "../api/UserApi";


// const Leaderboard = () => {
//     const [page , setPage] = useState<number>(0)
//     const { data: leaderboard, isLoading } = useGetLeaderboardQuery(page);
// //   useEffect(()=>{
// //      setPage()
// //   },[page , setPage]);

//   if (isLoading) return <div>Loading leaderboard...</div>;
//   return (
//     <table className="w-full mt-4 border-collapse">
//       <thead>
//         <tr>
//           <th className="border p-2">Rank</th>
//           <th className="border p-2">Username</th>
//           <th className="border p-2">Total Points</th>
//         </tr>
//       </thead>
//       <tbody>
//         {leaderboard?.users?.map((user, index) => (
//           <tr key={user._id}>
//             <td className="border p-2 text-center">{index + 1}</td>
//             <td className="border p-2">{user.username}</td>
//             <td className="border p-2 text-center">{user.totalPoints}</td>
//           </tr>
//         ))}
//       </tbody>

//     </table>

//   );
// };

// export default Leaderboard;


import { useState } from "react";
import { useGetLeaderboardQuery } from "../api/UserApi";

const Leaderboard = () => {
  const [page, setPage] = useState<number>(1); // Start from page 1
  const { data: leaderboard, isLoading } = useGetLeaderboardQuery(page);

  const handlePrevious = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (leaderboard?.totalPages && page < leaderboard.totalPages) {
      setPage(prev => prev + 1);
    }
  };

  if (isLoading) return <div>Loading leaderboard...</div>;

  return (
    <div className="w-full mt-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Rank</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard?.users?.map((user, index) => (
            <tr key={user._id}>
              <td className="border p-2 text-center">
                {(page - 1) * 10 + index + 1}
              </td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2 text-center">{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2">Page {page} of {leaderboard?.totalPages}</span>

        <button
          onClick={handleNext}
          disabled={page === leaderboard?.totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
