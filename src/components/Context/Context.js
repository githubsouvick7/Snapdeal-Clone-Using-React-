import { createContext, useReducer } from "react";

export const CartContext = createContext();

export const Context = (props) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                const temp = state.filter((item) => action.payload.id === item.id);
                if (temp.length > 0) {
                    return state;
                } else {
                    const newCartState = [...state, action.payload]
                    localStorage.setItem('cartValue', JSON.stringify(newCartState))
                    return newCartState;
                }

            case 'REMOVE':
                const tempstate = state.filter((item) => item.id !== action.payload.id)
                localStorage.setItem('cartValue', JSON.stringify(tempstate))
                return tempstate;

            case 'INCREASE':
                const tempCount = state.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item;
                    }
                });
                return tempCount;

            case "DECREASE":
                const tempDownCount = state.map((item) => {
                    if (item.id === action.payload.id && item.quantity !== 0) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item;
                    }
                });
                return tempDownCount

            default: return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('cartValue')) || [])
    const info = { state, dispatch };

    return (
        <CartContext.Provider value={info}>
            {props.children}
        </CartContext.Provider>
    )
}

