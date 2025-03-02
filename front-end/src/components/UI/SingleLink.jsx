export const SingleLink = ({ link, svg, text, ShowCss }) => {
  const currentPath = window.location.pathname;

  return (
    <div
      className={`${
        link === currentPath ? "text-blue-400" : null
      } flex gap-2 items-center cursor-pointer hover:text-blue-400 duration-200 rounded-lg ${
        ShowCss && "px-2"
      }`}
    >
      <div>{svg}</div>
      <div>
        <span className="text-lg font-normal hidden) lg:block">{text}</span>
      </div>
    </div>
  );
};
