"use client";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const DeleteProduct = ({ product }: { product: Product }) => {
  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (productId: number) => {
    await axios.delete(`/api/products/${productId}`);
    route.refresh();
    setIsOpen(false);
  };
  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleModal}>
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure to delete this data {product.title}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn " onClick={handleModal}>
              No
            </button>
            <button
              type="button"
              onClick={() => handleDelete(product.id)}
              className="btn btn-primary"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
