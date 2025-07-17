function InputComponent({
  id,
  placeholder,
  type,
  value,
  handleInput,
  width = 64,
}) {
  return (
    <div className="flex items-center mb-4 pr-2">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={(e) => handleInput(e.target.value)}
        value={value}
        autoComplete="off"
        className={`border border-gray-400 px-2 py-2 rounded-md w-[${width}px] max-[426px]:w-[300px]`}
      />
    </div>
  );
}

export default InputComponent;
