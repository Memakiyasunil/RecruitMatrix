import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export const Button = React.forwardRef(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-md shadow-[#4F46E5]/20',
      secondary: 'bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-md shadow-[#7C3AED]/20',
      outline: 'border-2 border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5]/10',
      ghost: 'text-[#0F172A] hover:bg-[#F8FAFC]',
      danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-md shadow-[#EF4444]/20',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-[16px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
