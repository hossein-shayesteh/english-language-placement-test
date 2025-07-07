import { auth, signOut } from "@/auth";

const Home = async () => {
  const session = await auth();

  console.log(session?.user);
  return (
    <>
      <div>Home</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>sign out</button>
      </form>
    </>
  );
};

export default Home;
