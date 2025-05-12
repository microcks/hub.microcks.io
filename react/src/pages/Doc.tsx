import { useParams } from "react-router-dom";

function Doc() {
  const { page } = useParams();
  return <h1>Doc: {page}</h1>;
}

export default Doc;