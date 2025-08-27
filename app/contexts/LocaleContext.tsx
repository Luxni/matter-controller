import React, { createContext, useState, ReactNode } from 'react';
import { translations } from '../constants/translations';
import { TranslationResources } from '../constants/types';

interface LocaleContextType {
    locale: string;
    toggleLocale: () => void;
    t: TranslationResources;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
    children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
    const [locale, setLocale] = useState('zh');

    const toggleLocale = () => {
        setLocale(prev => prev === 'zh' ? 'en' : 'zh');
    };

    return (
        <LocaleContext.Provider value={{ locale, toggleLocale, t: translations[locale] }}>
            {children}
        </LocaleContext.Provider>
    );
};
