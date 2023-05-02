"use client";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { log } from "console";

type Brand = {
  id: number;
  name: string;
};

const UpdateBrand = ({ brands }: { brands: Brand }) => {
  const route = useRouter();
  const [name, setName] = useState(brands.name);
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.patch(`/api/brands/${brands.id}`, {
      name: name,
    });
    // console.log(await axios.put(`/api/brand/${brands.id}`));
    route.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-info btn-sm"
        onClick={handleModal}
      >
        Edit
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className=" text-lg"> Update {brands.name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input
                type="text"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Brand Name ..."
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn " onClick={handleModal}>
                Close
              </button>
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBrand;
