import { cn } from '@/shared/lib/utils';
import React from 'react';
import * as CartItem from "./cart-item-details"; 
import { CartItemProps } from './cart-item-details/cart-item-details.types';

interface Props extends CartItemProps {
    className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({ className, imageUrl }) => {
  return (
    <div className={cn("flex bg-white py-5 gap-6", className)}>
      <CartItem.Image src={imageUrl} />
      <div className='flex-1'>
        <CartItem.Info />
      </div>
    </div>
  );
};