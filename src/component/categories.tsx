import { getAllCategories } from "@/sanity/querise";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { LuChevronsUpDown } from "react-icons/lu";

export default async function Categories({
  currentCategory,
}: {
  currentCategory?: string;
}) {
  const categories = await getAllCategories();
  if (categories?.length === 0) {
    return;
  }
  return (
    <div>
      <Menu>
        <MenuButton
          className="cursor-pointer flex items-center justify-between gap-2
        p-2 border border-gray-400 font-medium hover:border-black rounded-md duration-300"
        >
          {currentCategory ? currentCategory : "All Categories"}
          <LuChevronsUpDown className="size-4 text-slate-900" />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className="min-w-40 rounded-md bg-white p-1 ring-1 ring-gray-200 shadow-lg
        [--anchor-gap:6px] [--anchor-offset:4px] [--anchor-padding:10px]"
        >
          <MenuItem>
            <Link
              href={"/"}
              className="grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-3 py-2 data-[focus]:bg-gray-950/5"
            >
              <p className="col-start-2 text-sm/6">All Categories</p>
            </Link>
          </MenuItem>
          {categories?.map((category) => (
            <MenuItem key={category?.slug}>
              <Link
                href={`/category/${category?.slug}`}
                className="grid grid-cols-[1rem,1fr] items-center gap-2 rounded-md px-3 py-2 data-[focus]:bg-gray-950/5"
              >
                <p className="col-start-2 text-sm/6">{category?.title}</p>
              </Link>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
