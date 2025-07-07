import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  console.log(session?.user);
  return <div>Home</div>;
};

export default Home;
