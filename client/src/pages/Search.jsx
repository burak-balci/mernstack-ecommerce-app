import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const { item } = useParams();
  const { isLoading, isError, data } = useQuery(["product"], () =>
    fetchProducts()
  );

  const upItem = item.charAt(0).toUpperCase() + item.slice(1);

  if (isError) <div>Error</div>;
  if (isLoading) <div>Loading</div>;

  const filtered = data.filter(
    (tool) => tool.title.includes(upItem) || tool.type.includes(item)
  );

  return (
    <div className="flex flex-wrap gap-x-4 justify-center">
      {filtered.map((item) => (
        <div key={item._id} className="w-1/5">
          <ProductCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default Search;
