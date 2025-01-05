"use client";

import React from "react";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui";
import Image from "next/image";

interface Props {
    imageUrl: string;
    name: string;
    loading?: boolean;
    className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
    name,
    imageUrl,
    className,
}) => {
    const textDetaills = "text description";
    const totalPrice = "total price";
    return (
        <div className={cn(className, "flex flex-1")}>
            <div
                className={cn(
                    "flex items-center justify-center flex-1 relative w-full",
                    className
                )}>
                <Image
                    width={350}
                    height={350}
                    unoptimized
                    src={imageUrl}
                    alt="Logo"
                    className={cn(
                        "relative left-2 top-2 transition-all z-10 duration-300"
                    )}
                />
            </div>

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetaills}</p>
                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
