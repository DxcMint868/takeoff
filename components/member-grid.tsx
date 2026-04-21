import Image from "next/image";
import { useState } from "react";
import { MEMBERS, type Member } from "../lib/members";
import ArrowIcon from "../public/arrow-icon.png";
import MemberProfileModal from "./member-profile-modal";

export default function MemberGrid() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <>
      <div className="grid w-full grid-cols-5 gap-2 mq900:grid-cols-3 mq700:grid-cols-2 mq450:grid-cols-1">
        {MEMBERS.map((member) => (
          <button
            key={member.id}
            type="button"
            className="box-border w-full cursor-pointer border-0 bg-transparent p-0 text-left"
            onClick={() => setSelectedMember(member)}
          >
            <div className="group relative aspect-square w-full overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-300 ease-out"
                sizes="(max-width: 450px) 100vw, (max-width: 700px) 50vw, (max-width: 900px) 33vw, 20vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-colbalt opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-90"
                aria-hidden
              />
              <div className="absolute right-3 top-3 hidden size-10 items-center justify-center rounded-full bg-white/50 transition-all duration-300 ease-in-out group-hover:flex">
                <Image src={ArrowIcon} alt="" width={32} height={32} className="size-8" />
              </div>
              <div className="absolute bottom-0 left-0 hidden min-w-0 w-full max-w-full flex-col gap-1 px-2 py-4 transition-all duration-300 ease-in-out group-hover:flex">
                <p className="m-0 min-w-0 break-words text-[22px] font-sora font-semibold leading-tight text-white">
                  {member.name}
                </p>
                <p className="m-0 w-full min-w-0 break-words text-[14px] font-reg font-normal leading-snug text-white/50">
                  {member.role}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <MemberProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  );
}
