import type { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { GetUsersDocument, GetUserDocument } from "../graphql/client";
import { GetUsersQuery, GetUserQuery } from "../graphql/client";

const Home: NextPage = () => {
  const { data } = useQuery<GetUserQuery>(GetUserDocument, { variables: { id: "eW9kb2dhd2E6MzM4MjYxNDc4MjQ3NjA4MTcxMA=="} });

  console.log(data)
  return (
    <div style={{ margin: "0 auto", width: "1000px" }}>
      {data?.user.id}
    </div>
  );
};

export default Home;
