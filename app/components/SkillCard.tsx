import React from "react";

interface SkillCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
}

const SkillCard = ({
  icon,
  iconBgColor,
  iconColor,
  title,
  description,
}: SkillCardProps) => {
  return (
    <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-8 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${iconBgColor} mx-auto`}
      >
        <div className={iconColor}>{icon}</div>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default SkillCard;
