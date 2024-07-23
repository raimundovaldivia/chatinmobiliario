import * as React from 'react'
import { cn } from '@/lib/utils'
import { LucideProps } from 'lucide-react' // Assuming this is where the props come from

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: React.ElementType<LucideProps> // Updated type
    endIcon?: React.ElementType<LucideProps> // Updated type
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, startIcon: StartIcon, endIcon: EndIcon, ...props }, ref) => {
        return (
            <div className='w-full relative'>
                {StartIcon && (
                    <div className='absolute left-2 top-1/2 transform -translate-y-1/2'>
                        <StartIcon size={18} className='text-muted-foreground' />
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
                        StartIcon ? 'pl-8' : '',
                        EndIcon ? 'pr-8' : '',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {EndIcon && (
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                        <EndIcon className='text-muted-foreground' size={18} />
                    </div>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
