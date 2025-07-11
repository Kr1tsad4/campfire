function InputComponent({ id, placeholder, value, handleInput, width = 64 }) {
  return (
    <div className="flex items-center mb-4 pr-2">
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        onChange={(e) => handleInput(e.target.value)}
        value={value}
        className={`border border-gray-400 px-2 py-2 rounded-md w-[${width}px]`}
      />
    </div>
  );
}

export default InputComponent;

