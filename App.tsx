import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./navigation/StackNav";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <StackNav></StackNav>
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}
