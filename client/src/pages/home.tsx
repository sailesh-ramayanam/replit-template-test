import { useQuery, useMutation } from "@tanstack/react-query";
import { CheckCircle2, ClipboardList, Loader2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { insertTodoSchema, type Todo } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const formSchema = insertTodoSchema.extend({
  title: z.string().trim().min(1, "Please enter a todo title"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { data: todos, isLoading, error: queryError } = useQuery<Todo[]>({
    queryKey: ["/api/todos"],
  });

  const createTodoMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest("POST", "/api/todos", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
      form.reset();
      toast({
        title: "Success",
        description: "Todo created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create todo",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    createTodoMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-sm">
          <CardContent className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle2 className="w-8 h-8 text-primary" data-testid="icon-app" />
              <h1 className="text-2xl font-semibold text-foreground" data-testid="text-app-title">
                Todo App
              </h1>
            </div>

            {/* Input Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 space-y-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <FormControl>
                          <Input
                            placeholder="What needs to be done?"
                            {...field}
                            disabled={createTodoMutation.isPending}
                            className="flex-1"
                            data-testid="input-todo-title"
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          disabled={createTodoMutation.isPending}
                          className="px-6"
                          data-testid="button-create-todo"
                        >
                          {createTodoMutation.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            "Create from stackblitz"
                          )}
                        </Button>
                      </div>
                      <FormMessage data-testid="error-todo-title" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            {/* Todo List */}
            <div className="space-y-2">
              {queryError ? (
                // Error state
                <Alert variant="destructive" data-testid="alert-query-error">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Failed to load todos. Please try refreshing the page.
                  </AlertDescription>
                </Alert>
              ) : isLoading ? (
                // Loading state
                <>
                  <Skeleton className="h-16 w-full rounded-md" data-testid="skeleton-todo-1" />
                  <Skeleton className="h-16 w-full rounded-md" data-testid="skeleton-todo-2" />
                  <Skeleton className="h-16 w-full rounded-md" data-testid="skeleton-todo-3" />
                </>
              ) : todos && todos.length > 0 ? (
                // Todo items
                todos.map((todo) => (
                  <Card
                    key={todo.id}
                    className="hover-elevate transition-all duration-200"
                    data-testid={`card-todo-${todo.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-medium text-foreground truncate" data-testid={`text-todo-title-${todo.id}`}>
                            {todo.title}
                          </p>
                        </div>
                        <span className="text-sm font-mono text-muted-foreground shrink-0" data-testid={`text-todo-id-${todo.id}`}>
                          #{todo.id.slice(0, 8)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                // Empty state
                <div className="text-center py-12" data-testid="empty-state">
                  <ClipboardList className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" data-testid="icon-empty-state" />
                  <p className="text-muted-foreground text-base" data-testid="text-empty-state">
                    No todos yet. Create your first one above!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
