function InputComponent({
  id,
  placeholder,
  type,
  value,
  handleInput,
  handleBlur,
  width = 64,
  maxLength = 50
}) {
  return (
    <div className="flex items-center mb-4 pr-2">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={(e) => handleInput(e.target.value)}
        onBlur={handleBlur}
        value={value}
        autoComplete="off"
        className={`border border-gray-400 px-2 py-2 rounded-md w-[${width}px] max-[426px]:w-[300px] max-[321px]:w-[200px]`}
        maxLength={maxLength}
     />
    </div>
  );
}

export default InputComponent;
