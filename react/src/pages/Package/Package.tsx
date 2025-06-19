import { useParams } from "react-router";

export const Package = () => {
  const { packageId } = useParams();
  return <h1>Package: {packageId}</h1>;
};
