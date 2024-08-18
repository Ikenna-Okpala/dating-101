type ButtonProps = {
  text: string;
  onClick: () => void;
  type: "button" | "submit" | "reset" | undefined;
  customize?: string;
};

export default function Button({
  text,
  onClick,
  type,
  customize,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`bg-red-400 w-full h-12 rounded-lg ${customize}`}
    >
      {text}
    </button>
  );
}
