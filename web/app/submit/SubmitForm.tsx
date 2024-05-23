'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { cn } from '@/app/utils/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/Ui/form';
import { Input } from '@/app/components/Ui/input';
import { Spin } from 'antd';
import { useSession } from "next-auth/react";
import {useCommonContext} from "@/app/context/common-context";

const FormSchema = z.object({
  website: z.string(),
  url: z.string().url(),
});

export default function SubmitForm({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const {data: session, status} = useSession();
  const {showLoginModal, setShowLoginModal} = useCommonContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      website: '',
      url: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {

    let errMsg: any = "networkError";
    try {
      setLoading(true);

      if (status != "authenticated") {
        setShowLoginModal(true)
        return
      }

      const uri = "/api/gpts/insert";
      const params = {
        name: formData.website,
        url: formData.url,
        username: session.user.name,
        email: session.user.email
      };

     const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });
      
      if (resp.ok) {
        const res = await resp.json();
        if (res.code == '-1') {
          toast.error("fail");
        } else {
          toast.success("success");
        }
      }
     
      form.reset();
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'mx-3 mb-5 flex h-[449px] flex-col justify-between rounded-[12px] bg-gray-100 px-3 py-5 lg:h-[540px] lg:w-[444px] lg:p-8',
          className,
        )}
      >
        <div className='space-y-3 lg:space-y-5'>
          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>Website Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='AI Tool'
                    className='input-border-pink h-[42px] w-full rounded-[8px] border-[0.5px] bg-dark-bg p-5'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder='https://aitool.tools'
                    className='input-border-pink h-[42px] w-full rounded-[8px] border-[0.5px] bg-dark-bg p-5'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-[10px] lg:gap-8'>
          <button
            type='submit'
            disabled={loading}
            className={cn(
              'flex-center mt-auto h-[48px] w-full gap-4 rounded-[8px] bg-white text-center font-bold text-black hover:cursor-pointer hover:opacity-80',
              loading && 'hover:cursor-not-allowed',
            )}
          >
            {loading ? <Spin/> : 'submit'}
          </button>
          {/* <p className='text-[13px] text-white/40'>
            {t('add')} <span className='text-white'>{WEBSITE_EXAMPLE}</span> {t('text')}
          </p> */}
        </div>
      </form>
    </Form>
  );
}
