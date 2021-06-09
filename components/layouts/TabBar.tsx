import React from "react";

type TabStatus = {
  active: string;
};

interface Props {
  children: JSX.Element;
  setTabStatus: (obj: TabStatus) => void;
  tabStatus: TabStatus;
}

const TabBar = ({ children, setTabStatus, tabStatus }: Props) => {
  const handleTabClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { id } = e.currentTarget;

    setTabStatus({
      active: id,
    });
  };

  const isSelected = "bg-blue-500 text-white font-bold";
  const isNotSelected = "border";

  return (
    <div className="flex flex-col gap-5 my-20">
      <div className="flex gap-2 justify-end">
        <div
          id="opinion"
          className={`${
            tabStatus.active === "opinion" ? isSelected : isNotSelected
          } rounded-xl py-3 px-7 cursor-pointer hover:opacity-75`}
          onClick={(e) => handleTabClick(e)}
        >
          의견
        </div>
        <div
          id="mission"
          className={`${
            tabStatus.active === "mission" ? isSelected : isNotSelected
          } rounded-xl py-3 px-7 cursor-pointer hover:opacity-75`}
          onClick={(e) => handleTabClick(e)}
        >
          미션
        </div>
      </div>

      {children}
    </div>
  );
};

export default TabBar;
