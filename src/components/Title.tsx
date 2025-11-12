import { memo } from "react";

interface TitleProps {
  title: string;
  Subtitle: string;
  className: string;
  classNamee: string;
}

function Title({ title, Subtitle, className, classNamee }: TitleProps) {
  return (
    <div>
      <h2 className={`text-2xl mb-2 text-black dark:text-white ${className} `}>
        {title}
      </h2>
      <p className={`text-sm text-black dark:text-white ${classNamee}`}>
        {Subtitle}{" "}
      </p>
    </div>
  );
}

export default memo(Title);
