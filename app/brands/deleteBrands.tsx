"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Brand = {
  id: number;
  name: string;
};

const DeleteBrands = ({ brands }: { brands: Brand }) => {
  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (brandId: number) => {
    await axios.delete(`/api/brands/${brandId}`);

    route.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-error btn-sm"
        onClick={handleModal}
      >
        Delete
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className=" text-lg">
            Are you Sure to delete this {brands.name}
          </h3>
          <div className="modal-action">
            <button type="button" className="btn " onClick={handleModal}>
              No
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => handleDelete(brands.id)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBrands;
