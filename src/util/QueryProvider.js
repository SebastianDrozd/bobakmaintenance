'use client'

const { QueryClient, QueryClientProvider } = require("@tanstack/react-query")

const QueryProvider = ({children}) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
export default  QueryProvider;