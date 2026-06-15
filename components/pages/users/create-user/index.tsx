import { useState } from "react";
import {useForm} from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => Promise<void>;
  loading?: boolean;
};


const CreateUserModal = ({
    isOpen,
    onClose,
    onSubmit,
    loading,
}: Props) => {
    

    const { register, handleSubmit } = useForm();

    const handleFormSubmit = async (
        data: { name: string; email: string }
    ) => {
        onSubmit(data);
    };  
       

     return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create User</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            {...register("name")}
            // onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            {...register("email")}
            // value={email}
            // onChange={(e) => setEm   ail(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;