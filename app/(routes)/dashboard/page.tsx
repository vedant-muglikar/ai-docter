import React from "react";
import HIstoryList from "./_components/HIstoryList";
import { Button } from "@/components/ui/button";
import DoctorsAgentList from "./_components/DoctorsAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";

const Dashbord = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl">My Dashboard</h2>
          <AddNewSessionDialog />
        </div>
        <HIstoryList />
        <DoctorsAgentList />
      </div>
    </div>
  );
};

export default Dashbord;
