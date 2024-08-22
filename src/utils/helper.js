const fs = require("node:fs/promises")
const MainService = require('../services/item_service')


const readFile = async () => {
  try {
    const data = await fs.readFile("data.txt", "utf-8");
    console.log("show", JSON.parse(data));
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
};
const writeFile = async (data) => {
  console.log(data);
  try {
    fs.writeFile("data.txt", JSON.stringify(data, null, 2), "utf-8");
    console.log("Thanh cong");
  } catch (error) {
    console.log("That bai");
  }
};

const generateCountStatus = async (status, linkPrefix, allCount, activeCount, inactiveCount) => {
  return [
    {
      name: "All",
      count: allCount,
      value: "all",
      link: `${linkPrefix}`,
      active: status !== "inactive" && status !== "active",
    },
    {
      name: "Active",
      count: activeCount,
      value: "active",
      link: `${linkPrefix}?status=active`,
      active: status === "active",
    },
    {
      name: "Inactive",
      count: inactiveCount,
      value: "inactive",
      link: `${linkPrefix}?status=inactive`,
      active: status === "inactive",
    },
  ];
};

const generatePagination = (totalItems, currentPage, pageLimit, pageRanges = 5) => {
  const totalPages = Math.ceil(totalItems / pageLimit);
  const pageSkip = (currentPage - 1) * pageLimit;

  return {
    pageLimit,
    totalItems,
    totalPages,
    currentPage: parseInt(currentPage),
    pageRanges,
    pageSkip,
  };
};

  module.exports = {
    readFile,
    writeFile,
    generateCountStatus,
    generatePagination
  };