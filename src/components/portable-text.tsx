import { PortableText, PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
    },
};

interface PortableTextRendererProps {
    value: any[];
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
    return <PortableText value={value} components={components} />;
}
