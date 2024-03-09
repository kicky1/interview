type Variant = 'default' | 'destructive' | null | undefined;

type TAlert = {
  title: string;
  message: string;
  showAlert: boolean;
  variant?: Variant;
  setShowAlert: (showAlert: boolean) => void;
};