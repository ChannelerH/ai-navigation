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
        <h2 className='mt-[5px] text-sm font-bold lg:my-3 text-gray-500'>Submit your AI Tool and Get traffic from Ai Tool Directory</h2>
        <SubmitForm />
      </div>
    </div>
  );
}
