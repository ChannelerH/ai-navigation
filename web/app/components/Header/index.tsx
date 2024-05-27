"use client";

import {useState} from 'react'
import GeneratingModal from "../GeneratingModal";
import LoadingModal from "../LoadingModal";
import LoginButton from '../LoginButton';
import LoginModal from '../LoginModal';
import LogoutModal from "../LogoutModal";
import Submit from "@/app/submit/page";
import {useCommonContext} from '~/app/context/common-context'

export default function Header({
                                 locale = '',
                                 page = ''
                               }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {setShowLoadingModal} = useCommonContext();
  const {userData} = useCommonContext();


  return (
    <header className="bg-white text-zinc-900">
    <link rel="canonical" href="https://aitool.tools/"/>
 <section>
  <div className="h-auto w-screen"> 
  <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
    <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20"> 
    <a className="bg-cover bg-center px-20 py-5  cursor-pointer" href="/"
            style={{
              backgroundImage: "url('/website.png')",
            }}>
						</a>
      <div>
      <div className="flex items-center space-x-2">
        <a className="px-5 py-5 text-gray-500 hover:text-gray-800" href="/submit">
              Submit
        </a>
      <LoadingModal/>
      <GeneratingModal/>
      <LoginModal/>
      <LogoutModal/>
      <div className="hidden lg:ml-2 lg:relative lg:inline-block lg:text-left ">
          <LoginButton buttonType={userData ? 1 : 0} />
        </div>
     </div>
     </div>
</div>
</nav>
</div>
</section>
   </header>
  );
};
