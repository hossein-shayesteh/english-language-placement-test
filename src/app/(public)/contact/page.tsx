import Link from "next/link";

import { MapPin, Users } from "lucide-react";

const ContactPage = async () => {
  return (
    <div className="flex flex-1 justify-center px-10 py-10">
      <div className="layout-content-container flex max-w-[960px] flex-1 flex-col items-center">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] text-[#111618] sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-base leading-normal font-normal text-[#111618] sm:text-lg">
            We are the Foreign Language Lab at Amirkabir University of
            Technology. Connect with us to start your language learning journey.
          </p>
        </div>

        <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Location Info */}
          <div className="flex flex-col items-center rounded-xl border border-solid border-[#f0f3f4] p-6 text-center">
            <MapPin className={"size-8 text-[#30bde8]"} />
            <h3 className="mt-4 text-xl font-bold text-[#111618]">Visit Us</h3>
            <p className="mt-2 text-base text-[#637f88]">
              Amirkabir University of Technology
              <br />
              Cultural Affairs Office, Lower Floor
              <br />
            </p>
          </div>

          {/* Online Community Info */}
          <div className="flex flex-col items-center rounded-xl border border-solid border-[#f0f3f4] p-6 text-center">
            <Users className={"size-8 text-[#30bde8]"} />
            <h3 className="mt-4 text-xl font-bold text-[#111618]">
              Join Our Community
            </h3>
            <p className="mt-2 text-base text-[#637f88]">
              Stay updated and connect with other members.
            </p>
            <div className="mt-4 flex flex-col space-y-2">
              <div className="text-sm text-[#637f88]">
                Telegram Channel:{" "}
                <Link
                  href="https://t.me/autfll"
                  target="_blank"
                  className="text-[#30bde8] hover:underline"
                >
                  @autfll
                </Link>
              </div>
              <div className="text-sm text-[#637f88]">
                Telegram Group:{" "}
                <Link
                  href="https://t.me/AutForeignLanguagesClub"
                  target="_blank"
                  className="text-[#30bde8] hover:underline"
                >
                  @autForeignLanguagesClub
                </Link>
              </div>
              <div className="text-sm text-[#637f88]">
                Admin Contact:{" "}
                <Link
                  href="https://t.me/autfll_admin"
                  target="_blank"
                  className="text-[#30bde8] hover:underline"
                >
                  @autfll_admin
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Membership CTA */}
        <div className="mt-12 w-full max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#111618]">
            Become a Member
          </h2>
          <p className="mt-2 text-base text-[#637f88]">
            Interested in joining? Fill out our membership form to get started.
          </p>
          <Link href="https://forms.gle/vNnh7UHws5rjBrGm9" target="_blank">
            <button className="mx-auto mt-6 flex h-12 w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#30bde8] px-5 text-base leading-normal font-bold tracking-[0.015em] text-[#111618]">
              <span className="truncate">Membership Form</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
