"use client";

import {useState} from 'react'
import { BsGithub, BsTwitter } from "react-icons/bs";

import { usePathname } from "next/navigation";
import GeneratingModal from "../GeneratingModal";
import LoadingModal from "../LoadingModal";
import LoginButton from '../LoginButton';
import LoginModal from '../LoginModal';
import LogoutModal from "../LogoutModal";
import {useCommonContext} from '~/app/context/common-context'

export default function Header({
                                 locale = '',
                                 page = ''
                               }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {setShowLoadingModal} = useCommonContext();
  const {userData} = useCommonContext();

  return (
    <header>
 <section>
  <div className="h-auto w-screen"> 
  <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
    <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20"> 
    <a className="font-black text-3xl" href="#!">
							AI Tools{" "}
						</a>
 {/* <div className="mt-14 flex flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0">
  <a href="#" className="font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800">Templates</a>
  <a href="#" className="font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800">Pricing</a>
  <a href="#" className="font-inter rounded-lg pb-8 lg:px-6 lg:py-4 lg:pb-0 lg:hover:bg-gray-50 lg:hover:text-gray-800">FAQs</a>
</div>  */}
 {/* <div className="flex flex-col space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0">
  <a href="#" className="font-inter rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800">Sign Up</a>
  <a href="#" className="relative mr-5 inline-block rounded-xl border border-[#1353FE] bg-white px-8 py-4 text-center font-semibold text-[#1353FE] [box-shadow:rgb(0,0,0)_6px_6px] hover:border-black md:mr-6">Get Started</a> */}
{/* </div>  */}  
      <div>
      {/* <LoadingModal loadingText={indexLanguageText.loadingText}/> */}
      <LoadingModal/>
      {/* <GeneratingModal generatingText={indexLanguageText.generateText}/> */}
      <GeneratingModal/>
      <LoginModal
        // loadingText={indexLanguageText.loadingText}
        // redirectPath={`/${locale}/${page}`}
        // loginModalDesc={authLanguageText.loginModalDesc}
        // loginModalButtonText={authLanguageText.loginModalButtonText}
      />
      <LogoutModal
        // logoutModalDesc={authLanguageText.logoutModalDesc}
        // confirmButtonText={authLanguageText.confirmButtonText}
        // cancelButtonText={authLanguageText.cancelButtonText}
        // redirectPath={`/${locale}/${page}`}
      />
      <div className="hidden lg:ml-2 lg:relative lg:inline-block lg:text-left ">
          <LoginButton buttonType={userData ? 1 : 0} />
        </div>
     </div>
</div>
</nav>
</div>
</section>
   </header>
  );
};
