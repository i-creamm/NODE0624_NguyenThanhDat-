const fs = require("node:fs/promises")


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

// const generateCountStatus = async (status, linkPrefix, allCount, activeCount, inactiveCount) => {
//   return [
//     {
//       name: "All",
//       count: allCount,
//       value: "all",
//       link: `${linkPrefix}`,
//       active: status !== "inactive" && status !== "active",
//     },
//     {
//       name: "Active",
//       count: activeCount,
//       value: "active",
//       link: `${linkPrefix}?status=active`,
//       active: status === "active",
//     },
//     {
//       name: "Inactive",
//       count: inactiveCount,
//       value: "inactive",
//       link: `${linkPrefix}?status=inactive`,
//       active: status === "inactive",
//     },
//   ];
// };


const generateCountStatusOrder = async (allCount, pendingCount, shippingCount) => {
  return [
    {
      name: "All",
      status: "",
      class: "default",
      count: allCount
    },
    {
      name: "Pending",
      status: "pending",
      class: "default",
      count: pendingCount
    },
    {
      name: "Shipping",
      status: "shipping",
      class: "default",
      count: shippingCount
    },
  ];
};

const generateCountStatusUser = async (allCount, activeCount, inactiveCount) => {
  return [
    {
      name: "All",
      status: "",
      class: "default",
      count: allCount
    },
    {
      name: "Active",
      status: "active",
      class: "default",
      count: activeCount
    },
    {
      name: "Inactive",
      status: "inactive",
      class: "default",
      count: inactiveCount
    },
  ];
};

const generatePaginationVer2 = (page, limitItems, pageRanges, totalPage) => {
  const currentPage = page ? parseInt(page) : 1;
  const totalPages = Math.ceil(totalPage / limitItems);
  const pageSkip = (currentPage - 1) * limitItems;

  return {
    limitItems,
    totalPage,
    totalPages,
    currentPage,
    pageRanges,
    pageSkip,
  };
};

const generatePagination = (page, limitItems, pageRanges, totalPage) => {
  const currentPage = page ? parseInt(page) : 1;
  const totalPages = Math.ceil(totalPage / limitItems);
  const pageSkip = (currentPage - 1) * limitItems;

  return {
    limitItems,
    totalPage,
    totalPages,
    currentPage,
    pageRanges,
    pageSkip,
  };
};

  module.exports = {
    readFile,
    writeFile,
    generateCountStatusUser,
    generatePagination,
    generatePaginationVer2,
    generateCountStatusOrder
  };