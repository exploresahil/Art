import { productsType } from "@/sanity/types/allTypes";
import { PortableText } from "@portabletext/react";
import "./style.scss";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";

interface Props {
  data?: productsType;
}

const Description = ({ data }: Props) => {
  //console.log("data->", data);
  const brand = useAppSelector(selectBrand);

  return (
    <search
      id="proDesc"
      style={{
        backgroundColor:
          brand && brand.backgroundColor ? brand.backgroundColor : "#ffffff",
      }}
    >
      {data?.description && (
        <>
          <h4>Description:</h4>
          <div className="desc-cont">
            <PortableText value={data?.description} />
          </div>
        </>
      )}
    </search>
  );
};

export default Description;
