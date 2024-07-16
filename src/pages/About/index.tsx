import Calendar  from "@/components/ui/calendar";
import DatePicker from "../../components/DatePicker";
import { useState } from "react";

function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <DatePicker />
      {/* <Calendar /> */}
    </div>
  )
}

export default AboutPage;
