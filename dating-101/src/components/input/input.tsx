type InputProps = {
  type: string;
  name: string;
  customize?: string;
};

export default function Input({ type, name, customize }: InputProps) {
  return (
    <input
      type={type}
      name={name}
      className={`h-12 rounded-lg border-2 border-gray-400 px-4 ${customize}`}
    ></input>
  );
}
