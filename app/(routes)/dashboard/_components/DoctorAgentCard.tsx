import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ArrowRightIcon } from "lucide-react";

type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};

type props = {
  doctorAgent: doctorAgent;
};

const DoctorAgentCard = (doctorAgent: props) => {
  return (
    <div>
      <Image
        src={doctorAgent.doctorAgent.image}
        alt={doctorAgent.doctorAgent.specialist}
        width={200}
        height={300}
        className="w-full h-[250px] object-cover rounded-xl"
      />
      <h2 className="font-bold text-lg">
        {doctorAgent.doctorAgent.specialist}
      </h2>
      <p className="line-clamp-2 text-sm text-gr-500">
        {doctorAgent.doctorAgent.description}
      </p>
      <Button className="w-full mt-2">
        Start Consultation <ArrowRightIcon />
      </Button>
    </div>
  );
};

export default DoctorAgentCard;
