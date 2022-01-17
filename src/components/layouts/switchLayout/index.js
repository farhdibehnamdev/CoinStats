import { Switch } from "antd";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
export const SwitchLayout = () => {
  return <Switch size="large" defaultChecked onChange={onChange} />;
};
