"use client";

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

const friends = ["Esme", "Oscar", "Eddie", "Dayane", "Monika"];

const statuses = ["free", "busy", "maybe"] as const;
type Status = (typeof statuses)[number];

function getNextStatus(current: Status): Status {
  const index = statuses.indexOf(current);
  return statuses[(index + 1) % statuses.length];
}

function getDates() {
  const dates: string[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

export default function AvailabilityGrid() {
  const [data, setData] = useState<Record<string, Record<string, Status>>>({});
  const dates = getDates();

  // 🔥 REAL-TIME LISTENER
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "planner", "main"), (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as any);
      }
    });

    return () => unsub();
  }, []);

  const updateStatus = async (date: string, friend: string) => {
    const current = data?.[date]?.[friend] || "free";
    const next = getNextStatus(current);

    await setDoc(doc(db, "planner", "main"), {
      ...data,
      [date]: {
        ...(data[date] || {}),
        [friend]: next
      }
    });
  };

  const countFree = (date: string) => {
    return friends.filter(f => data?.[date]?.[f] === "free").length;
  };

  return (
    <div>
      <h2>💗 Availability</h2>

      {dates.map(date => (
        <div key={date} style={{ display: "flex", marginBottom: 8 }}>
          <div style={{ width: 120 }}>{date}</div>

          {friends.map(friend => {
            const status = data?.[date]?.[friend] || "free";

            const color =
              status === "free"
                ? "#b8f5b8"
                : status === "busy"
                ? "#f5b8b8"
                : "#f5e6b8";

            return (
              <div
                key={friend}
                onClick={() => updateStatus(date, friend)}
                style={{
                  width: 70,
                  height: 40,
                  background: color,
                  margin: 4,
                  cursor: "pointer",
                  textAlign: "center",
                  lineHeight: "40px",
                  borderRadius: 8
                }}
              >
                {status}
              </div>
            );
          })}

          <div style={{ marginLeft: 10 }}>
            Free: {countFree(date)}
          </div>
        </div>
      ))}
    </div>
  );
}
