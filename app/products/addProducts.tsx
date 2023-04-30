"use client";

import { SyntheticEvent, useState } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

// impot useState

const addProduct = ({ brands }: { brands: Brand[] }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/products", {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    });
    setTitle("");
    setTitle("");
    setBrand("");
    route.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add new
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a Brand
                </option>
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-action">
              <button type="button" className="btn " onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default addProduct;
