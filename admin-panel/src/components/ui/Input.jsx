import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(({ className, type, icon: Icon, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={18} />
        </div>
      )}
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-[16px] border border-gray-200 bg-white px-4 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-50',
          Icon && 'pl-10',
          error && 'border-[#EF4444] focus-visible:ring-[#EF4444]',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="mt-1 text-xs text-[#EF4444]">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
