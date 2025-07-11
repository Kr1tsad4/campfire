function InputComponent({ id, placeholder, width = 64 }) {

  return (
    <div className="flex items-center mb-4 pr-2">
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className={`border border-gray-400 px-2 py-2 rounded-md w-${width}`}
      />
    </div>
  );
}

export default InputComponent;
