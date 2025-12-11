import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning";
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  loading = false,
  confirmText,
  cancelText,
  variant = "danger",
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!loading) {
      await onConfirm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !loading && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`
              p-2.5 rounded-full
              ${variant === "danger"
                ? "bg-red-100 dark:bg-red-900/20"
                : "bg-amber-100 dark:bg-amber-900/20"
              }
            `}>
              <AlertTriangle
                className={`
                  h-5 w-5
                  ${variant === "danger"
                    ? "text-red-600 dark:text-red-500"
                    : "text-amber-600 dark:text-amber-500"
                  }
                `}
              />
            </div>
            <DialogTitle className="text-xl mb-0">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className={`text-base ${isRTL ? 'text-right' : 'text-left'}`}>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl"
          >
            {cancelText || t('common.cancel')}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            variant={variant === "danger" ? "destructive" : "default"}
            className={`
              rounded-xl
              ${variant === "danger"
                ? "bg-red-600 hover:bg-red-700 dark:bg-red-900 dark:hover:bg-red-800"
                : ""
              }
            `}
          >
            {loading && (
              <Loader2 className={`h-4 w-4 animate-spin ${isRTL ? 'ml-2' : 'mr-2'}`} />
            )}
            {confirmText || t('common.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;