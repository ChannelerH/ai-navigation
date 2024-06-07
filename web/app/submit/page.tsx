import React from 'react';

import SubmitForm from './SubmitForm';

// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
//   const t = await getTranslations({
//     locale,
//     namespace: 'Metadata.submit',
//   });

//   return {
//     title: t('title'),
//   };
// }

export default function Page() {

  return (
    <div className='mx-auto max-w-pc'>
      <div className="flex flex-col items-center justify-center">
        <h1 className='text-5xl text-gray-500'>Submit your AI Tool</h1>
        <h2 className='mt-[5px] text-sm font-bold lg:my-3 text-gray-500'>Submit your AI Tool and Get traffic from Aixy AI Directory</h2>
        <SubmitForm />
      <div className="w-[90%] md:w-full max-w-3xl mx-auto mt-8 text-lg text-blue-500">
        <span>Add </span>
        <span 
          className="text-[#f05011] text-xl inline-flex"
          style={{ textAlign: 'left', unicodeBidi: 'bidi-override' }}
        >
           {'<a href="https://aitool.tools/" title="Aixy AI Tools Directory">Aixy AI</a>'}
        </span>
        <span> to your website homepage, And then you can submit your website successfully for free!</span>
      </div>
      </div>
    </div>
  );
}
