"use client"
import useFormat from "@/app/hooks/useFormat"

import { ILetter } from "@/app/types/Letter"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getLetter } from "@/app/actions/getLetter";

const Letter = () => {
  const [letter, setLetter] = useState<ILetter | undefined>(undefined);
  const { formatDate } = useFormat();
  const { letterId } = useParams();

  useEffect(() => {
    getLetter(letterId)
      .then((letter) => {
        setLetter(letter)
      })
  }, [letterId]);

  if (!letter) return null;

  return (
    <div className="w-full bg-white p-4 shadow-xl md:ml-4">
       {/* SENDER INFORMATION */}
      <div className="flex flex-col items-end mb-4">
        <div>
          <div>{letter.sender?.name}</div>
          <div>{letter.sender?.email}</div>
          <div>{letter.sender.country}</div>
          <div>{formatDate(letter.createdAt)}</div>
        </div>
      </div>
      {letter.content}
    </div>
  )
}

export default Letter