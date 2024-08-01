// import React, { useEffect, useState } from "react";
// import PropertyCard from "./PropertyCard";
// import styled from "styled-components";
// import { Pagination } from "antd";

// const PropertyListContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 40px;
//   padding: 2rem;
// `;

// const FilterSection = styled.div`
//   margin-bottom: 20px;
// `;

// const PropertyList = () => {
//   const [properties, setProperties] = useState({});
//   const [filters, setFilters] = useState({
//     location: '',
//     minPrice: '',
//     maxPrice: '',
//     bedrooms: '',
//     amenities: []
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   console.log(properties)

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await fetch(
//           "https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=2&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4",
//           {
//             method: "GET",
//             headers: {
//               "x-rapidapi-host": "bayut.p.rapidapi.com",
//               "x-rapidapi-key":
//                 "82892125afmshe27717ee321ef69p12f83cjsna90e85c77d68",
//             },
//           }
//         );
//         const data = await response.json();
//         console.log(data);
//         setProperties(data || {});
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const handlePagination = async (page,pageSize) =>{
//     console.log(page);
//     try {
//       const response = await fetch(
//         `https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=${pageSize}&page=${page}&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4`,
//         {
//           method: "GET",
//           headers: {
//             "x-rapidapi-host": "bayut.p.rapidapi.com",
//             "x-rapidapi-key":
//               "82892125afmshe27717ee321ef69p12f83cjsna90e85c77d68",
//           },
//         }
//       );
//       const data = await response.json();
//       console.log(data);
//       setProperties(data || {});
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }

//   }

//   return (
//     <div>
//       <FilterSection>{/* Add filter inputs and handlers */}</FilterSection>
//       <PropertyListContainer>
//         {properties?.hits?.map((property) => (
//           <PropertyCard key={property.id} property={property} />
//         ))}
//       </PropertyListContainer>
//       <Pagination
//         current={properties?.page}
//         total={properties?.nbPages}
//         pageSize={properties?.hitsPerPage}
//         onChange={(page,pageSize) => handlePagination(page,pageSize)}
//       />
//     </div>
//   );
// };

// export default PropertyList;

import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import styled from "styled-components";
import { Pagination, Select,Spin } from "antd";

const PropertyListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 2rem;
`;

const PropertyList = () => {
  const [properties, setProperties] = useState({});
  const [filterdProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    rooms: "",
    amenities: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchProperties = async (page = 1, pageSize = 25) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=${
          filters.location || 5002
        }&purpose=for-rent&hitsPerPage=${pageSize}&page=${
          page - 1
        }&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4&minPrice=${
          filters.minPrice
        }&maxPrice=${filters.maxPrice}&bedrooms=${
          filters.bedrooms
        }&amenities=${filters.amenities.join(",")}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "bayut.p.rapidapi.com",
            "x-rapidapi-key":
              "82892125afmshe27717ee321ef69p12f83cjsna90e85c77d68",
          },
        }
      );
      const data = await response.json();
      setProperties(data || {});
      setFilteredProperties(data?.hits || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handlePagination = (page, pageSize) => {
    fetchProperties(page, pageSize);
  };

  const handleFilterChange = (e, type) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    if (type === "price") {
      if (e.target.value === "lowtohigh") {
        const lowtoHigh = properties?.hits?.sort((a, b) => a.price - b.price);
        setFilteredProperties(lowtoHigh);
      } else if (e.target.value === "highttolow") {
        const lowtoHigh = properties?.hits?.sort((a, b) => b.price - a.price);
        setFilteredProperties(lowtoHigh);
      }
    }
    if (type === "rooms") {
      if (e.target.value === "0") {
        const data = properties?.hits?.filter((ele) => ele?.rooms === 0);
        setFilteredProperties(data);
      } else if (e.target.value === "1") {
        const data = properties?.hits?.filter((ele) => ele?.rooms === 1);
        setFilteredProperties(data);
      } else if (e.target.value === "2") {
        const data = properties?.hits?.filter((ele) => ele?.rooms === 2);
        setFilteredProperties(data);
      }
    }
    // if(type === "location"){
    //   const data = properties?.hits?.map((each)=>each?.location?.filter((ele)=>ele?.name === e.target.value))
    //  setFilteredProperties(data)
    // }
  };

  const handleAmenityChange = (e) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      amenities: prevFilters.amenities.includes(value)
        ? prevFilters.amenities.filter((amenity) => amenity !== value)
        : [...prevFilters.amenities, value],
    }));
  };

  return (
    <div>
      <div className="filtered-container">
        
        <div>
          <label htmlFor="price">price:</label>
          <select
            id="price"
            
            onChange={(e) => handleFilterChange(e, "price")}
          >
            <option value=""></option>
            <option value="lowtohigh">Min Price</option>
            <option value="highttolow">Max Price</option>
          </select>
        </div>
        <div>
          <label htmlFor="rooms">Bed Rooms</label>
          <select
          id="rooms"
            
            onChange={(e) => handleFilterChange(e, "rooms")}
          >
            <option value=""></option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            name="location"
            value={filters.location}
            onChange={(e)=>handleFilterChange(e,"location")}
          />
        </div>
        {/* <label>Amenities:</label>
        <select multiple onChange={handleAmenityChange}>
          <option value="pool">Pool</option>
          <option value="gym">Gym</option>
          <option value="parking">Parking</option>
        </select> */}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem' }}>
          <Spin size="large" />
        </div>):(
        <PropertyListContainer>
        {filterdProperties?.length ?
        filterdProperties?.map((property) => (
          <PropertyCard key={property.id} property={property} />
        )):
        <p className="no-data">There is no Data Based on Your Filters</p>
      }
      </PropertyListContainer>)}
      <Pagination
      className="pagination"
        current={properties?.page}
        total={properties?.nbPages}
        pageSize={properties?.hitsPerPage}
        onChange={(page, pageSize) => handlePagination(page, pageSize)}
      />
    </div>
  );
};

export default PropertyList;
