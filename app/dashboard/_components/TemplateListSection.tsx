import React from 'react';
import Templates from '@/app/(data)/Templates';
import TemplateCard from './TemplateCard';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export type FORM = {
    label: string;
    name: string;
    field: "input" | "textarea"; // ✅ STRICT type
    required?: boolean;
};

export type TEMPLATE = {
    name: string;
    desc: string;
    category: string;
    icon: string;
    slug: string;
    aiPrompt: string;
    form?: FORM[];
};


function TemplateListSection({ userSearchInput }: any) {

    const [templateList, setTemplateList] = useState(Templates);

    useEffect(() => {
        if (userSearchInput) {
            const filterData = Templates.filter(item =>
                item.name.toLowerCase().includes(userSearchInput.toLowerCase())
            );
            setTemplateList(filterData);
        } else {
            setTemplateList(Templates);
        }
    }, [userSearchInput]);

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10'>
            {templateList.map((item: TEMPLATE) => (
                <TemplateCard
                    key={item.slug}  // Added unique key prop
                    {...item}
                />
            ))}
        </div>
    );
}

export default TemplateListSection;