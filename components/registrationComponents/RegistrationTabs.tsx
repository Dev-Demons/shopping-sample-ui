import React from "react";
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from "react-tabs";
import "react-tabs/style/react-tabs.css";

// Internal Imports
import ProducerRegistrationForm from "./ProducerRegistrationForm";
import ConsumerRegistrationForm from "./ConsumerRegistrationForm";
import VendorRegistrationForm from "./VendorRegistrationForm";

resetIdCounter();



function Registration() {
  return (
    <div className="max-w-xl mx-auto">
      <Tabs className="flex flex-col">
        <TabList className="flex flex-row justify-center bg-white border-none">
          <Tab className="p-4 border-0 border-b-2 focus:border-blue-600  focus:outline-none cursor-pointer">
            <h1>Consumer</h1>
          </Tab>
          <Tab className="p-4 border-0 border-b-2 focus:border-blue-600  focus:outline-none cursor-pointer">
            <h1>Producer</h1>
          </Tab>
          <Tab className="p-4 border-0 border-b-2 focus:border-blue-600  focus:outline-none cursor-pointer">
            <h1>Vendor</h1>
          </Tab>
        </TabList>

        <TabPanel>
          <ConsumerRegistrationForm />
        </TabPanel>
        <TabPanel>
          <ProducerRegistrationForm />
        </TabPanel>
        <TabPanel>
          <VendorRegistrationForm />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Registration;
