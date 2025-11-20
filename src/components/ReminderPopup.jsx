import React, { useEffect, useState } from "react";
import { getReminders } from "../modules/emailEngine";

export default function ReminderPopup() {
  const [due, setDue] = useState([]);

  useEffect(() => {
    const list = getReminders();
    const now = new Date();

    const dueList = list.filter((r) => new Date(r.due) <= now);
    setDue(dueList);
  }, []);

  if (due.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "#ef4444",
        padding: 20,
        borderRadius: 10,
        color: "white",
        maxWidth: 300,
        zIndex: 9999
      }}
    >
      <h4 style={{ marginTop: 0 }}>Important Follow-Ups</h4>
      {due.map((r, i) => (
        <div key={i} style={{ marginTop: 10 }}>
          • {r.type} is due.
        </div>
      ))}
    </div>
  );
}
