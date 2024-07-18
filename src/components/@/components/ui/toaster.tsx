import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="rounded-lg bg-pallette-100 dark:bg-gray-900"
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-lg font-semibold text-pallette-600 dark:text-blue-100">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-base font-semibold text-pallette-600 dark:text-blue-100">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
