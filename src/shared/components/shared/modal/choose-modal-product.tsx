"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ProductWithRelations } from "../../../../../@types/prisma";
import { ProductForm } from "./product-form";

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
                    className
                )}>
                {/* Accessible Dialog Title */}
                <DialogTitle className="hidden">
                    <VisuallyHidden>
                        {`Choose ${product.name}`}{" "}
                        {/* Announce the product name */}
                    </VisuallyHidden>
                </DialogTitle>

                <ProductForm onSubmit={() => router.back()} product={product} />
            </DialogContent>
        </Dialog>
    );
};
