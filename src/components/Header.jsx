import { Popover } from "@headlessui/react";

const Header = () => {
  return (
    <Popover className="relative bg-white">
      <div className="mx-auto px-6 py-3 border-b">
        <div className="flex items-center justify-between border-gray-300 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default Header;
