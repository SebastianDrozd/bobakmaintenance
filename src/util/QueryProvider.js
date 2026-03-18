"use client"

import { useState } from "react";

const { QueryClient, QueryClientProvider } = require("@tanstack/react-query")

const QueryProvider = ({children}) => {
    
   const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
export default QueryProvider;