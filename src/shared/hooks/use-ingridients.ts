import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
}

export const useIngredients = (): ReturnProps => {
    const [ingredients, setIngridients] = React.useState<Ingredient[]>([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        async function getIngridients() {
            try {
                setLoading(true);
                const ingredients = await Api.ingredients.getAll();
                setIngridients(ingredients);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getIngridients();
    }, []);
    return { loading, ingredients };
};
