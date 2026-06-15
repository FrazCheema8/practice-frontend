
import { useCreateUserMutation, useGetUsersQuery } from "@/redux/api/api";
import { useState } from "react";
import CreateUserModal from "./create-user";

const Users = () => {
      const [createUser, { isLoading, error }] = useCreateUserMutation();
      const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();

    const [isModalOpen, setIsModalOpen] = useState(false);
    
      async function handleCreateUser() {
        const name = "John Doe";
        const email = "john@gmail.com";
    
        try {
          await createUser({ name, email }).unwrap();
        } catch (error) {
          console.error(error);
        }
      }
    
      return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            <h1 className="text-6xl font-bold text-center sm:text-left">
              Dashboard
            </h1>
    
            <div>
              <h2 className="text-2xl font-bold">Users</h2>
    
              {usersLoading ? (
                <p>Loading users...</p>
              ) : (
                <ul>
                {usersData?.users?.map((user: any) => (
                    <li key={user.id}>
                    {user.name} - {user.email}
                    </li>
                ))}
                </ul>
              )}
            </div>
    
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={()=> setIsModalOpen(true)}
              
            > Create User</button>

            {isModalOpen && (
              <CreateUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={async (data) => {
                    await createUser(data).unwrap();
                    setIsModalOpen(false);
                }}
                loading={isLoading}
                />
            )}
            
          </main>
        </div>
      );
}

export default Users;