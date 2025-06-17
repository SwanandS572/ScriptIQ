"use client";
import React from 'react'
// TODO: Update the import path below to the correct location of TemplateListSection or create the file if missing
// import type { TEMPLATE } from '../../_components/TemplateListSection'
type TEMPLATE = {
    name: string;
    desc: string;
    icon?: string;
    form?: Array<{
        label: string;
        name: string;
        field: 'input' | 'textarea';
        required?: boolean;
    }>;
};
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { on } from 'events'
import { useState } from 'react'
import { Loader2Icon } from 'lucide-react';

interface PROPS {
    selectedTemplate?: TEMPLATE;
    userFormInput:any
    loading: boolean;
}

function FormSection({ selectedTemplate,userFormInput,loading}:PROPS) {

    const [formData, setFormData] = useState<any>();

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userFormInput(formData);
    }

    return (
        <div className='p-5 shadow-md border bg-white rounded-lg'>
            {/* @ts-ignore */}
            <Image
                src={selectedTemplate?.icon ?? '/placeholder.png'}
                alt='icon'
                width={70}
                height={70}
            />
            <h2 className='font-bold text-2xl mb-2 text-primary'>
                {selectedTemplate?.name}
            </h2>
            <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

            <form className='mt-6' onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div className='my-2 flex flex-col gap-2 mb-7' key={index}>
                        <label className='font-bold'>{item.label}</label>
                        {item.field === 'input' ? (
                        <Input
                            name={item.name}
                            required={item?.required}
                            onChange={handleInputChange}
                            suppressHydrationWarning
                        />
                        ) : item.field === 'textarea' ? (
                        <Textarea
                            name={item.name}
                            required={item?.required}
                            onChange={handleInputChange}
                            suppressHydrationWarning
                        />
                        ) : null}
                    </div>
                ))}
                <Button type="submit" className='w-full py-6'
                disabled={loading}                
                suppressHydrationWarning
                >
                    {loading&&<Loader2Icon className='animate-spin' />}
                    Generate Content</Button>
            </form>
        </div>
    )
}

export default FormSection
