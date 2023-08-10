import React from "react";


const Search = ({ searchQuery }) => {
  // This is a placeholder array for demonstration purposes.
  // Replace this with your actual data that needs to be filtered based on the search query.
  const searchData = [
    { title: "Question 1" },
    { title: "Question 2" },
    { title: "Tag 1" },
    { title: "Tag 2" },
  ];

  // Step 4: Implement the search logic to filter the data based on the search query
  const filteredData = searchData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Display the filtered data */}
      {filteredData.map((item) => (
        <div key={item.title}>{item.title}</div>
      ))}
    </div>
  );
};

export default Search;
