import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "../@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../@/components/ui/dialog";
import type { DialogDeleteProps } from "src/types";

function DialogDelete({
  handleDelete,
  id,
  task,
  column,
  isTask = true,
}: DialogDeleteProps) {
  const taskClassName =
    "absolute bottom-1 right-6 z-30 text-pallette-500 dark:text-slate-500 translate-x-1/2 bg-transparent dark:bg-transparent dark:hover:bg-blue-100 hover:bg-pallette-200 p-2";
  const columnClassName =
    "bg-transparent hover:bg-pallette-300 dark:bg-transparent p-2 ml-2";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={isTask ? taskClassName : columnClassName}>
          <MdOutlineDeleteOutline

            className="opacity-100 hover:opacity-65 hover:text-pallette-100 dark:hover:bg-blue-100 dark:hover:text-slate-500"
            size={20}

          />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-pallette-100 dark:bg-gray-900 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-pallette-600 dark:text-blue-100">
            Are you sure you want to delete {isTask ? task : column}?
          </DialogTitle>
          <DialogDescription className="text-pallette-300">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => handleDelete(id)}
            size="sm"
            className="px-3 text-pallette-100"
          >
            Delete
          </Button>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-pallette-300 text-pallette-600"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDelete;
