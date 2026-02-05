import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
  pathname: string;
  variant: "desktop" | "mobile";
  hoveredPath?: string | null;
  onMouseEnter?: () => void;
  onClick?: () => void;
}

const NavLink = ({
  href,
  label,
  pathname,
  variant,
  hoveredPath,
  onMouseEnter,
  onClick,
}: NavLinkProps) => {
  const isActive = pathname === href;

  if (variant === "desktop") {
    const isHovered = hoveredPath === href;
    const showBorder = isHovered || (isActive && !hoveredPath);

    const className = `px-4 h-full flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium border-b-2 ${
      showBorder
        ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
        : isActive
          ? "text-blue-600 dark:text-blue-400 border-transparent"
          : "text-gray-700 dark:text-gray-200 border-transparent"
    }`;

    return (
      <Link href={href} className={className} onMouseEnter={onMouseEnter}>
        {label}
      </Link>
    );
  }

  // Mobile variant
  const className = `block px-4 py-3 rounded-lg transition-colors ${
    isActive
      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold"
      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
  }`;

  return (
    <Link href={href} className={className} onClick={onClick}>
      {label}
    </Link>
  );
};

export default NavLink;
