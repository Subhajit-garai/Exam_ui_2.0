import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib";

const ToggleSwitch = (
  // Check: boolean,
  label?: string,
  // onCheckedChange?: () => {},
  className?: string,
  SwitchClassName?: string,
  LabelClass?: string
) => {
  return (
    <div className={cn("", className)}>
      <Label title={cn(label, "")} className={cn(LabelClass, "")} />
      <Switch className={cn(SwitchClassName, "")} />
    </div>
  );
};

export default ToggleSwitch;
