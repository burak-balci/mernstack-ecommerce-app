import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";

const Headsets = () => {
  const { isLoading, isError, data } = useQuery(["product"], () =>
    fetchProducts()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  const filtered = data.filter((item) => item.type == "headset");

  return (
    <div className="gap-x-4 flex flex-wrap justify-center">
      <div className="flex flex-wrap gap-x-4 justify-center w-full">
        {filtered.map((item) => (
          <div key={item._id} className="sm:w-1/2 lg:w-1/5">
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Headsets;
