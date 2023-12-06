import {
    useState
} from "react"
import {
    API
} from "../libs/api"

export function useUpdateStatusTodo() {
    const [checkedState, setCheckedState] = useState({});

    const handleCheckbox = async (todoId, initialStatus) => {
        try {
            const currentStatus = checkedState[todoId] ?? initialStatus;
            const updatedStatus = !currentStatus;

            const response = await API.patch(`/todolist/status/${todoId}`, {
                status: updatedStatus
                },  {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            setCheckedState({
                ...checkedState,
                [todoId]: updatedStatus,
              });

            console.log('status', response.data);
        } catch (error) {
            console.error('Error updating todo status:', error);
        }
    }

    return {
        checkedState,
        handleCheckbox
    };

}