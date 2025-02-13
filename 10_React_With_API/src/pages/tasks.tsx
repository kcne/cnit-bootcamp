import { useGetAllTasks } from "@/api/queries/get-all-tasks";
import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function Tasks() {
  const token = localStorage.getItem('authToken') ?? undefined;
  const { data: taskData, isLoading} = useGetAllTasks(token);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
    <Card className="w-[80%]">
      <CardHeader>
        <CardTitle>Task Manager</CardTitle>
        <CardDescription>You can use this card to manage your tasks.</CardDescription>
      </CardHeader>
      <CardContent >
      { isLoading && "Loading tasks..." }
      {
        taskData && <DataTable columns={columns} data={taskData.tasks} />
      }
      </CardContent>
    </Card>
    </div>
  )
}

export default Tasks