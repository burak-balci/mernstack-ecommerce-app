import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api";

const Home = () => {
  const { isLoading, isError, data } = useQuery(["product"], () =>
    fetchProducts()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <div className="flex flex-wrap gap-x-4 justify-center">
      {data.map((item) => (
        <div key={item._id} className="sm:w-1/2 lg:w-1/5">
          <ProductCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default Home;
