import classNames from "classnames";

interface ButtonProps {
  label: string;
  emoji?: string;
  isPrimary?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const TriviaGameButton: React.FC<ButtonProps> = ({
  label,
  emoji,
  isPrimary = false,
  isDisabled = false,
  onClick = () => {},
}) => {
  return (
    <button
      disabled={isDisabled}
      className={classNames(
        "relative px-4 py-1 border border-gray-300 rounded-md font-semibold disabled:opacity-50 h-10 md:h-full md:text-lg",
        {
          "bg-[#147A5C] hover:bg-[#006F50] text-white": isPrimary,
        },
        {
          "hover:bg-gray-50": !isPrimary,
        }
      )}
      onClick={onClick}
    >
      <span>
        {emoji && (
          <span className="animate-fadeIn mr-2 absolute right-0">{emoji}</span>
        )}
        {label}
      </span>
    </button>
  );
};

export default TriviaGameButton;
