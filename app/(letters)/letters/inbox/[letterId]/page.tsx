import getCurrentUser from "@/actions/getCurrentUser";
import LettersList from "@/components/letters/LettersList";
import Letter from "@/components/letters/Letter";

import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation";

const InboxPage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login")

  const currentDate = new Date();

  const receivedLetters = await prismadb.letter.findMany({
    where: {
      receiverId: user.id,
      arrivalAt: {
        lt: currentDate
      }
    }, include: {
      sender: true
    }
  });


    return (
        <>
          <LettersList letters={receivedLetters}/>
          <Letter />
        </>
    )
}

export default InboxPage;