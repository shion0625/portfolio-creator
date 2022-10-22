import type { NextPage } from "next";
import { useQuery } from "@apollo/client";

import { GetUsersDocument, GetUserDocument } from "../../graphql/dist/client";
import { GetUsersQuery,GetUserQuery } from "../../graphql/dist/client";

const Home: NextPage = () => {
  // const { data, loading, error } = useQuery<GetUsersQuery>(GetUsersDocument, { variables: { limit: 10, offset: 0 } });
  const { data } = useQuery<GetUserQuery>(GetUserDocument, { variables: { userId: "eW9kb2dhd2E6MzM4MjYxNDc4MjQ3NjA4MTcxMA=="} });

  console.log(data)
  return (
    <div style={{ margin: "0 auto", width: "1000px" }}>
      kaito
    </div>
  );
};

export default Home;
