// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useState } from 'react';
// import { FaMapMarkerAlt, FaSearch, FaSun, FaMoon } from 'react-icons/fa';
// import ReactDOMServer from 'react-dom/server';
// import { motion } from "framer-motion";
// import { SectionWrapper } from '../hoc';
// import { styles } from "../styles";
// // import { ComputersCanvas } from "./canvas";

// const Hero = () => {
//   return (
//     <section className={`relative w-full h-screen mx-auto`}>
//       <div
//         className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
//       >
//         <div>
//           <p className={`${styles.heroSubText} mt-0 text-white-100`}>
//             <br className='sm:block hidden' />
//           </p>
//         </div>
//       </div>

//       {/* <ComputersCanvas /> */}

//     </section>
//   );
// };


// const GlacierMap = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResult, setSearchResult] = useState(null);

//   useEffect(() => {
//     const map = L.map('map').setView([30.3753, 69.3451], 6); // Centered on Pakistan

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     }).addTo(map);

//     const customIcon = L.divIcon({
//       className: 'custom-icon',
//       html: ReactDOMServer.renderToString(<FaMapMarkerAlt size={32} color="blue" />),
//     });

//     const marker = L.marker([30.3753, 69.3451], { icon: customIcon }).addTo(map);
//     marker.bindPopup("<b>Hello from Pakistan!</b><br>Click me!");

//     function onMapClick(e) {
//       L.popup()
//         .setLatLng(e.latlng)
//         .setContent(`You clicked the map at ${e.latlng.toString()}`)
//         .openOn(map);
//     }

//     map.on('click', onMapClick);

//     if (searchResult) {
//       const { lat, lon } = searchResult;
//       marker.setLatLng([lat, lon]);
//       map.setView([lat, lon], 10);
//     }

//     return () => {
//       map.off('click', onMapClick);
//       map.remove();
//     };
//   }, [searchResult]);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`
//       );
//       const data = await response.json();

//       if (data.length > 0) {
//         setSearchResult(data[0]);
//       } else {
//         setSearchResult(null);
//       }
//     } catch (error) {
//       console.error('Error searching location:', error);
//     }
//   };

//   const handleGetCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setSearchResult({ lat: latitude, lon: longitude });
//       }, (error) => {
//         console.error('Error getting current location:', error);
//       });
//     } else {
//       alert('Geolocation is not supported by your browser.');
//     }
//   };
  
//   return (
//     <div style={{ textAlign: 'center', margin: '20px' }}>
//       <div className="navbar-search" style={{ margin: '20px auto', maxWidth: '500px', border: '1px solid #26bbff', borderRadius: '5px', overflow: 'hidden' }}>
//         <input
//           type="text"
//           className="textStyle"
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ border: 'none', outline: 'none', padding: '10px', width: '80%', float: 'left' }}
//         />
//         <button
//           className="button"
//           onClick={handleSearch}
//           style={{ float: 'left', backgroundColor: '#26bbff', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}
//         >
//           <FaSearch className="icon" size={18} />
//         </button>
//         <button
//           className="button"
//           onClick={handleGetCurrentLocation}
//           style={{ float: 'right', backgroundColor: '#26bbff', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}
//         >
//           <FaMapMarkerAlt className="icon" size={18} />
//         </button>
//       </div>

//       {/* <span className="heading" style={{ fontSize: '24px', color: '#fff', margin: '20px' }}>
//         Interactive Map to Explore Different Countries and their Glaciers
//       </span> */}

//       <div id="map"
//   style={{
//     height: '680px', marginTop: '40px', marginBottom: '20px', border: '2px solid #26bbff',  borderRadius: '15px', overflow: 'hidden',        
//   }}
// ></div>
//     </div>
//   );
// };


// export default SectionWrapper(GlacierMap, Hero, 'hero');

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState, useRef } from 'react';
import { FaMapMarkerAlt, FaSearch, FaSun, FaMoon } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import { SectionWrapper } from '../hoc';

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div>
          <p className={`mt-0 text-white`}>
            <br className='sm:block hidden' />
          </p>
        </div>
      </div>
    </section>
  );
};

const GlacierMap = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [darkTheme, setDarkTheme] = useState(true); // State for theme
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current).setView([30.3753, 69.3451], 6);
    }

    const tileLayer = darkTheme
       ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      // ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      // : 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';
            :'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    if (mapInstance.current) {
      // Remove existing tile layer before adding a new one
      mapInstance.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          mapInstance.current.removeLayer(layer);
        }
      });

      L.tileLayer(tileLayer, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstance.current);
    }

    const customIcon = L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(<FaMapMarkerAlt size={32} color={darkTheme ? "blue" : "red"} />),
    });

    const marker = L.marker([30.3753, 69.3451], { icon: customIcon }).addTo(mapInstance.current);
    marker.bindPopup("<b>Hello from Pakistan!</b><br>Click me!");

    function onMapClick(e) {
      L.popup()
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng.toString()}`)
        .openOn(mapInstance.current);
    }

    mapInstance.current.on('click', onMapClick);

    if (searchResult) {
      const { lat, lon } = searchResult;
      marker.setLatLng([lat, lon]);
      mapInstance.current.setView([lat, lon], 10);
    }

    return () => {
      mapInstance.current.off('click', onMapClick);
    };
  }, [searchResult, darkTheme]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setSearchResult(data[0]);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSearchResult({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);

    // Change map container background color
    const mapContainerStyle = mapContainer.current.style;
    mapContainerStyle.backgroundColor = darkTheme ? 'black' : 'white';
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px', }}>
      <div className="navbar-search" style={{ margin: '20px auto', maxWidth: '500px', border: '1px solid #26bbff', borderRadius: '5px', overflow: 'hidden' }}>
        <input
          type="text"
          className="textStyle"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', outline: 'none', padding: '10px', width: '80%', float: 'left', backgroundColor: 'black' }}
        />
        <button
          className="button"
          onClick={handleSearch}
          style={{ float: 'left', backgroundColor: '#26bbff', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}
        >
          <FaSearch className="icon" size={18} />
        </button>
        <button
          className="button"
          onClick={handleGetCurrentLocation}
          style={{ float: 'right', backgroundColor: '#26bbff', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}
        >
          <FaMapMarkerAlt className="icon" size={18} />
        </button>
      </div>

      {/* Theme toggle button */}
      <button
        className="button"
        onClick={toggleTheme}
        style={{
          backgroundColor: darkTheme ? '#000' : '#fff',
          color: darkTheme ? '#fff' : '#000',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          float: 'right',
          marginTop: '-65px',
        }}
      >
        {darkTheme ? <FaMoon size={18} /> : <FaSun size={18} />}
      </button>

      <div
        id="map"
        ref={mapContainer} // Use ref to attach map container
        style={{
          height: '680px',
          marginTop: '40px',
          marginBottom: '20px',
          border: '2px solid #26bbff',
          borderRadius: '15px',
          overflow: 'hidden',
          backgroundColor: darkTheme ? '#000' : '#fff', // Change map background color based on theme
        }}
      ></div>
    </div>
  );
};

export default SectionWrapper(GlacierMap, Hero, 'hero')


// import { useEffect, useState } from 'react';
// import { FaSun, FaMoon } from 'react-icons/fa';

// const GlacierMap = () => {
//   const [darkTheme, setDarkTheme] = useState(true); // State for theme
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const toggleTheme = () => {
//     setDarkTheme((prevTheme) => !prevTheme);
//   };

//   return (
//     <div>
//       {/* Rest of your component code */}
//       {isMobile ? (
//         <button
//           className="button"
//           onClick={toggleTheme}
//           style={{
//             backgroundColor: darkTheme ? '#000' : '#fff',
//             color: darkTheme ? '#fff' : '#000',
//             border: 'none',
//             padding: '10px',
//             cursor: 'pointer',
//             position: 'fixed',
//             bottom: '20px',
//             right: '20px',
//             zIndex: '999',
//           }}
//         >
//           {darkTheme ? <FaMoon size={18} /> : <FaSun size={18} />}
//         </button>
//       ) : (
//         <button
//           className="button"
//           onClick={toggleTheme}
//           style={{
//             backgroundColor: darkTheme ? '#000' : '#fff',
//             color: darkTheme ? '#fff' : '#000',
//             border: 'none',
//             padding: '10px',
//             cursor: 'pointer',
//             float: 'right',
//             marginTop: '-65px',
//           }}
//         >
//           {darkTheme ? <FaMoon size={18} /> : <FaSun size={18} />}
//         </button>
//       )}
//     </div>
//   );
// };

// export default GlacierMap;
