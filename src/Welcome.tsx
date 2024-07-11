import { useState } from "react";
import GetWord from "./GetWord";

const Welcome = () => {
  const [categories] = useState<string[]>([
    "book",
    "fruits",
    "jobs",
    "sport",
    "animal",
  ]);
  const [categorySelected, setCategorySelected] = useState<string>("book");

  return (
    <>
      <div className="flex max-w-screen-xl flex-wrap mx-auto">
        <div className="mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold  text-center tracking-tight text-gray-900 dark:text-white">
              Welcome to our Wordle - TS
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center my-5">
            In this game you have to guess what the word is using the category
            selected that appear. This game is a great way to practice reading,
            spelling and review vocabulary all at the same time.
          </p>

          <form className="max-w-sm mx-auto my-5">
            <label
              htmlFor="categories"
              className="block mb-2 text-center text-sm font-medium text-gray-900 dark:text-white"
            >
              Select your category
            </label>

            <select
              value={categorySelected}
              onChange={(e) => setCategorySelected(e.target.value)}
              id="categories"
              className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.toLocaleUpperCase()}
                </option>
              ))}
            </select>
          </form>
        </div>

        <GetWord categoryWord={categorySelected} />
      </div>
    </>
  );
};

export default Welcome;
