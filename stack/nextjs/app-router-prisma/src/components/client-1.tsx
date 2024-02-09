"use client";
import { useState } from "react";

export function Client1() {
  const [name, setName] = useState("");
  return (
    <div>
      <div>client-1</div>
      input:
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      name: {name}
    </div>
  );
}
