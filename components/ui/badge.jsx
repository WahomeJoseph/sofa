'use client';
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-amber-600 text-white hover:bg-amber-700',
        secondary: 'border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200',
        destructive: 'border-transparent bg-red-600 text-white hover:bg-red-700',
        outline: 'border-amber-600 text-amber-600 bg-transparent hover:bg-amber-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
));
Badge.displayName = 'Badge';

export { Badge, badgeVariants };