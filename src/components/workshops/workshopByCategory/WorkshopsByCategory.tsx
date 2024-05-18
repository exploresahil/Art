import { workshopType } from "@/sanity/types/allTypes";
import "./style.scss";
import WorkshopCard from "../../ui/workshop-card/WorkshopCard";
import LinkButton from "../../ui/LinkButton/LinkButton";
import Link from "next/link";

interface CategoryProps {
  products: workshopType[] | undefined;
  loading: boolean;
}

const WorkshopsByCategory = ({ products, loading }: CategoryProps) => {
  //console.log("products->", products);

  if (loading) {
    return <div id="allWorkshops">Loading...</div>;
  }

  if (products?.length == 0) {
    return (
      <div id="allWorkshops" className="noWorkshops">
        <div className="no-workshop-container">
          <h2>Sorry, There are currently no workshop scheduled.</h2>
          <p>
            Please go to <Link href="/">Home.</Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div id="allWorkshops">
      {products && products.length == 0 ? <></> : <></>}
      {products?.map((item, i) => (
        <WorkshopCard key={i} item={item} />
      ))}
    </div>
  );
};

export default WorkshopsByCategory;
