"use client"

import { HiMail, HiOutlineGlobe, HiMoon } from "react-icons/hi"

import Button from "./Button"
import Link from "next/link"
import SearchInput from "./SearchInput"
import UserNavigation from "./UserNavigation"

import { usePathname } from "next/navigation"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"


const Navbar = () => {
    const { user } = useContext(UserContext)
      const pathname = usePathname();
    
    return (
      <nav className='flex gap-2 justify-between items-center px-4 py-6 border-b w-full h-16'>
        <div className="flex gap-4 md">
          <Link href="/" className="font-bold flex items-center gap-2">
            <HiOutlineGlobe />
            <h1 className="hidden md:block">Pen<span className="orange_gradient">Pal</span></h1>
          </Link>
          <SearchInput />
        </div>
        <div className="flex justify-end gap-4 items-center flex-1">
            { user ? (
              <>
                { pathname.includes("inbox") && (
                  <Button><Link href={"/letter/new"}>Compose</Link></Button>
                )}
                <HiMoon />
                <Link href={"/inbox"}>
                  <HiMail />
                </Link>
                <UserNavigation showMenu={true} />
              </>
            ) : (
              <div className="flex gap-2 items-center">
                <Link href={"/login"}>Log In</Link>
                <Link href={"/register"}><button className="outline_btn">Join</button></Link>
              </div>
            )}
        </div>
      </nav>
    )
    }

export default Navbar