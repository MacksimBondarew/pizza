import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react"
import { useSet } from "react-use";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIds: Set<string>;
    onAddId: (id: string) => void;
}

export const useFilterIngridients = (): ReturnProps => {
    const [ingredients, setIngridients] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedIds, { toggle }] = useSet(new Set<string>([]));
    React.useEffect(() => {
        async function getIngridients() {
            try {
                setLoading(true);
                const ingredients = await Api.ingredients.getAll();
                console.log(ingredients)
                setIngridients(ingredients);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        getIngridients();
    }, [])
    return { ingredients, loading, selectedIds, onAddId: toggle };
}