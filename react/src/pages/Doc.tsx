import { useParams } from "react-router";

function Doc() {
  const { page } = useParams();
  return <h1>Doc: {page}</h1>;
}

export default Doc;