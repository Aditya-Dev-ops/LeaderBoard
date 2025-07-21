import type { Dispatch, SetStateAction } from 'react';

import { useGetUsersQuery } from '../api/UserApi';
// import { useState} from 'react';

const UserSelector = ({ selectedUserId, setSelectedUserId }:{ selectedUserId:string; setSelectedUserId: Dispatch<SetStateAction<string>>;}) => {
  const { data: users, isLoading } = useGetUsersQuery();
  console.log(users);

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div className="flex flex-col gap-4 w-[70%]">
      <select
        className="p-2 border rounded"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option disabled value="">-- Select a User --</option>
        {users?.map((user) => (
          <option key={user?._id} value={user?._id}>{user.username}</option>
        ))}
      </select>

      {/* <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add new user"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="p-1 border rounded"
        />
        <button onClick={handleAddUser} className="bg-blue-500 text-white px-2 py-1 rounded">Add</button>
      </div> */}
    </div>
  );
};

export default UserSelector;