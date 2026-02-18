import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeError } from "../Redux/Products";
export const Error = ({ error, id }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between gap-4 bg-neutral-200  rounded-md">
      <div className="flex pl-3 py-2 ">
        <h1 className="text-neutral-800">{error} </h1>
      </div>
      <div className="mt-1 mr-1 cursor-pointer  hover:bg-neutral-100 h-fit rounded-full items-center flex justify-center" onClick={() => dispatch(removeError(id))}>
        <X className="size-3.5 " />
      </div>
    </div>
  );
};
