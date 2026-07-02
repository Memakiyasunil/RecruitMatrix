import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-[#4F46E5]/10 text-[#4F46E5]',
    success: 'bg-[#10B981]/10 text-[#10B981]',
    warning: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    danger: 'bg-[#EF4444]/10 text-[#EF4444]',
    info: 'bg-[#2563EB]/10 text-[#2563EB]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
