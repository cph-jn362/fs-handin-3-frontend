import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TodoEntity } from "./TodoEntity";

//const baseUrl = "http://localhost:3003";
const ip: string = "192.168.1.94";

export const useGetTodos = () => {
  const fetchTodos = async () => {
    return await axios.get("http://" + ip + ":3003/todo",);
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  return { isLoading, isError, data: data?.data, error };
};

export const usePostTodo = () => {
  return useMutation({
    mutationFn: (newTodo: TodoEntity) => {
      return axios.post("http://" + ip + ":3003/todo", newTodo);
    },
  });
};
