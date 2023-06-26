import { useCallback, useState } from "react";

export function useCartProducts(initialValue = 0) {
    const [count, setCount] = useState(initialValue);

    const increment = useCallback(() => {
        setCount((currentCount) => currentCount - 1)
    }, []);

    const decrement = useCallback(() => {
        setCount((currentCount) => currentCount + 1)
    }, []);

    return { count, decrement, increment }
}
