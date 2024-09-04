import React from 'react'

type TextElement = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span'

type TextProps = {
    as?: TextElement
    weight?: 'regular' | 'semibold' | 'bold' | 'extrabold'
    size?: 'xs' | 's' | 'm' | 'l' | 'xl'
    variant?: 'supporting' | 'shy' | 'primary' | 'success' | 'warning' | 'danger'
    children: React.ReactNode
    className?: string
}

const weightClasses: Record<NonNullable<TextProps['weight']>, string> = {
    regular: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
}

const sizeClasses: Record<NonNullable<TextProps['size']>, string> = {
    xs: 'text-xs',
    s: 'text-sm',
    m: 'text-base',
    l: 'text-lg',
    xl: 'text-xl',
}

const variantClasses: Record<NonNullable<TextProps['variant']>, string> = {
    supporting: 'text-gray-500',
    shy: 'text-gray-400',
    primary: 'text-blak-500',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
}

export default function Text({
    as: Component = 'span',
    weight = 'regular',
    size = 'm',
    variant = 'primary',
    children,
    className = '',
    ...props
}: TextProps) {
    return (
        <Component
            className={`${weightClasses[weight]} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </Component>
    )
}
