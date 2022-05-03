import { useState } from "react";

export default function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue() {
    setValue((currentValue) => !currentValue);
  }

  function resetValue() {
    setValue(defaultValue);
  }

  return [value, toggleValue, resetValue];
}
