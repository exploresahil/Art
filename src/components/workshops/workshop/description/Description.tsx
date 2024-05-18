import { workshopType } from "@/sanity/types/allTypes";
import "./style.scss";
import { useAppSelector } from "@/src/lib/hook";
import { selectBrand } from "@/src/lib/reducer/brandSlice.reducer";
import { PortableText } from "@portabletext/react";

interface Props {
  data?: workshopType;
}

const Description = ({ data }: Props) => {
  const brand = useAppSelector(selectBrand);

  return (
    <section
      id="workshopDesc"
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
    </section>
  );
};

export default Description;
