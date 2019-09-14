import { useReducer, useCallback } from 'react';

const httpReducer = (currHttpState, action) => {
    switch (action.type) {
        case "SEND":
            return { isLoading: true, error: undefined, data: undefined, extra: undefined };
        case "RESPONSE":
            return { ...currHttpState, isLoading: false, data: action.responseData, extra: action.extra };
        case "CLEAR": 
            return { ...currHttpState, error: undefined };
        case "ERROR":
            return { isLoading: false, error: action.message };
        default:
            throw new console.error("Should not get there");
    }
};

const useHttp = () => {
   
    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        isLoading: false,
        error: undefined,
        data: undefined,
        extra: undefined,
    });

    const sendRequest = useCallback((url, method, body, extra) => {
        dispatchHttp({ type: "SEND" });

        fetch( url, { 
            method: method,
            body: body,
            headers: { "Content-Type": "application/json" }
            },
        )
            .then(response => response.json())
            .then(responseData => {
                dispatchHttp({ type: "RESPONSE", responseData,  extra: extra });
            })
            .catch(error => {
                dispatchHttp({ type: "ERROR", message: error.message });
            });

    }, [])

    return { 
        isLoading: httpState.isLoading,
        data: httpState.data,
        error: httpState.error,
        sendRequest,
        requestExtra: httpState.extra,
    }
   
}

export default useHttp;