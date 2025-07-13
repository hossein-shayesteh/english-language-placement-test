import Image from "next/image";
import Link from "next/link";

import { auth } from "@/auth";

import { Button } from "@/components/ui/button";

const Home = async () => {
  const session = await auth();

  return (
    <div className="flex flex-1 justify-center py-5 md:px-40">
      <div className="layout-content-container flex max-w-[960px] flex-1 flex-col">
        <div className="@container">
          <div className="flex flex-col gap-6 px-4 py-10 @[480px]:gap-8 @[864px]:flex-row">
            <div>
              <Image
                src={"/book.png"}
                alt={"book"}
                className="mt-4 aspect-video w-full rounded-xl @[480px]:h-auto @[480px]:min-w-[400px] @[864px]:w-full"
                width={480}
                height={480}
              />
            </div>
            <div className="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center">
              <div className="flex flex-col gap-2 text-left">
                <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] text-[#111618] @[480px]:text-5xl @[480px]:leading-tight @[480px]:font-black @[480px]:tracking-[-0.033em]">
                  Assess Your English Proficiency
                </h1>
                <h2 className="text-sm leading-normal font-normal text-[#111618] @[480px]:text-base @[480px]:leading-normal @[480px]:font-normal">
                  Take our comprehensive placement test to determine your
                  current English language level. Our test covers grammar,
                  vocabulary, reading, and listening skills, providing you with
                  an accurate assessment of your abilities.
                </h2>
              </div>
              <Link href={session?.user ? "/test" : "/sign-in"}>
                <Button className="w-full cursor-pointer">
                  {session?.user ? "Start Test" : "Login"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
