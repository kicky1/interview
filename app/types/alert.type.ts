export type Variant = 'default' | 'destructive' | null | undefined;

export type TAlert = {
  title: string;
  message: string;
  showAlert: boolean;
  variant?: Variant;
  setShowAlert: (showAlert: boolean) => void;
};
