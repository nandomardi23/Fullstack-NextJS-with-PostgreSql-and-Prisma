// import axios from "axios";
import { PrismaClient } from "@prisma/client";
import AddBrands from "./addBrands";
import DeleteBrands from "./deleteBrands";
import UpdateBrand from "./updateBrands";

const prisma = new PrismaClient();

const getBrands = async () => {
  const res = await prisma.brand.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  // console.log(res);
  return res;
};

const Brand = async () => {
  const brands = await getBrands();
  return (
    <div>
      <div className=" mb-3 ">
        <AddBrands />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name Brand</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brands, index) => (
            <tr key={brands.id}>
              <td>{index + 1}</td>
              <td>{brands.name}</td>
              <td className="flex justify-center space-x-1">
                <DeleteBrands brands={brands} />
                <UpdateBrand brands={brands} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Brand;
