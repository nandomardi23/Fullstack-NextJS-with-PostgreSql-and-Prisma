"use client";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const addBrands = () => {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const route = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/brands", {
      name: name,
    });
    setName("");
    route.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={handleModal}>
        add New
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className=" text-lg">Tambah Brand</h3>
          <form onSubmit={handleSubmit}>
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default addBrands;
