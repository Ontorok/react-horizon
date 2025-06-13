import { useImperativeHandle, useRef } from "react";

function MyInput({ ref }) {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input ref={realInputRef} />;
}

export default function Focus() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
    inputRef.current.style.borderRadius = "50px";
  }
  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
