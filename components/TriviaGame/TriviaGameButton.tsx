import classNames from "classnames";

interface ButtonProps {
  label: string;
  emoji?: string;
  shouldPing?: boolean;
  isPrimary?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const TriviaGameButton: React.FC<ButtonProps> = ({
  label,
  emoji,
  shouldPing = false,
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
      {shouldPing && (
        <span
          className="absolute -top-3 -left-2 h-4 w-4"
          data-aos="zoom-y-out"
          data-aos-delay="1200"
        >
          <span className="animate-ping absolute -left-0.5 top-1 inline-flex h-5 w-5 rounded-full bg-blue-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
        </span>
      )}

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
