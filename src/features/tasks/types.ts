export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export interface TodoItemProps extends Task {
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, description: string) => void;
}
