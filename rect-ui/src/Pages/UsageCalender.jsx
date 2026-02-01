import { useEffect, useState } from "react";

const UsageCalendar = () => {
  const [usageDates, setUsageDates] = useState([]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // ✅ YAHAN FUNCTION LIKHNA HAI
  const isUsedDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return usageDates.includes(dateStr);
  };

  return <div>{/* calendar UI */}</div>;
};

export default UsageCalendar;
