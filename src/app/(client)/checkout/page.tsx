"use client";
import { useAppSelector } from "@/src/lib/hook";
import { GetCart } from "@/src/lib/reducer/CardSlice.reducer";
import { useRouter } from "next/navigation";

const page = () => {
  const data = useAppSelector(GetCart);
  const router = useRouter();
  if (data.length == 0) {
    router.push("/404");
  }
  return <div>page</div>;
};

export default page;
