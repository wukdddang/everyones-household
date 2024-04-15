import { useFetch } from "@/helpers/reactQuery";

const useHousehold = (options) => {
  const context = useFetch({
    url: "/api/household",
    options: {
      params: options,
    },
  });

  return context;
};

export default useHousehold;
