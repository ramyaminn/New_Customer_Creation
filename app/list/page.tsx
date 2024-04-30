// "use client"
// import React, { useState } from 'react';
// import Image from 'next/image';
// import logo from '../../public/img/facebook.svg';
// import '../../public/sass/main.css';

// export default function Page() {
//   const [activeSection, setActiveSection] = useState('1');

//   const handleButtonClick = (sectionId="") => {
//     setActiveSection(sectionId);
//   };

//   const [searchValue, setSearchValue] = useState('');
//   const [searchResult, setSearchResult] = useState('');

//   const data = [
//     { accountNumber: 120, firstName: 'ramy', phone: '12345' },
//     { accountNumber: 122, firstName: 'Mohamed', phone: '54321' },
//     { accountNumber: 124, firstName: 'Nour', phone: '6789' },
//     { accountNumber: 126, firstName: 'Nader', phone: '9876' },

//     { accountNumber: 130, firstName: 'ramy', phone: '1234567' },
//     { accountNumber: 132, firstName: 'Mohamed', phone: '7654321' },
//     { accountNumber: 134, firstName: 'Nour', phone: '5436789' },
//     { accountNumber: 136, firstName: 'Nader', phone: '9876543' },
//   ];

//   const handleInputChange = (e: { target: { value: string; }; }) => {
//     const value = e.target.value.trim();
//     setSearchValue(value);

//     let result = '';
    // if (value !== '') {
    //   let found = false;
    //   result += '<table><thead><tr><th>Account Number</th><th>First Name</th><th>Phone</th></tr></thead><tbody>';

    //   data.forEach((item) => {
    //     if (item.phone.toString().indexOf(value) !== -1) {
    //       result += `<tr><td>${item.accountNumber}</td><td>${item.firstName}</td><td>${item.phone}</td></tr>`;
    //       found = true;
    //     }
    //   });

    //   result += '</tbody></table>';

    //   if (!found) {
    //     result += '<div class="sec_empty"><p>Not Found</p><a class="btn_show empty" href="#2">Create Customer</a></div>';
    //   }
    // }

//     setSearchResult(result);
//   };

//   return (
    // <main className="page">
    //   <div className="top">
    //     <Image src={logo} alt="" width={100} height={100} />
    //   </div>
    //   <div className="board">
    //     <nav>
    //       <ul>
    //         <li>
    //           <a
    //             className={`btn_show ${activeSection === '1' ? 'active' : ''}`}
    //             href="#1"
    //             onClick={() => handleButtonClick('1')}
    //           >
    //             Search
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             className={`btn_show ${activeSection === '2' ? 'active' : ''} ${
    //               activeSection === '2' ? 'empty' : ''
    //             }`}
    //             href="#2"
    //             onClick={() => handleButtonClick('2')}
    //           >
    //             Create Customer
    //           </a>
    //         </li>
    //       </ul>
    //     </nav>
    //     <div className={`box ${activeSection === '1' ? 'active' : ''}`} id="1">
    //       <form action="">
    //         <div className="search_input">
    //           {/* <input type="number" id="searchInput" placeholder="Search by number..." /> */}
		// 	  <input type="text" id="searchInput" placeholder="Search by number..." onChange={handleInputChange} />
    //           <button className="btn_search">Search</button>

						
     			 
    //         </div>
		// 	<div  className="list" id="result" dangerouslySetInnerHTML={{ __html: searchResult }}></div>
    //       </form>
    //     </div>
    //     <div className={`box ${activeSection === '2' ? 'active' : ''}`} id="2">
    //       <form action="">
    //         <div className="all_input">
    //           <div className="s_row">
    //             <label htmlFor="">First Name</label>
    //             <input type="text" />
    //           </div>
    //           <div className="s_row">
    //             <label htmlFor="">Last Name</label>
    //             <input type="text" />
    //           </div>
    //           <div className="s_row">
    //             <label htmlFor="">Email</label>
    //             <input type="email" />
    //           </div>
    //           <div className="s_row">
    //             <label htmlFor="">Phone Number</label>
    //             <input type="number" />
    //           </div>
    //         </div>
    //         <button className="btn">New Account</button>
    //       </form>
    //     </div>
    //   </div>
    // </main>
//   );
// }
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/img/facebook.svg';
import '../../public/sass/main.css';

export default function Page() {
  const [activeSection, setActiveSection] = useState('1');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleButtonClick = (sectionId = '') => {
    setActiveSection(sectionId);
  };

  const handleInputChange = (e: { target: { value: string; }; }) => {
    const value = e.target.value.trim();
    setSearchValue(value);
  };

  // const handleSearch = async () => {
  //   try {
  //     const response = await fetch(`http://192.168.19.35:8081/customers/${searchValue}`);
  //     const data = await response.json();
      
  //     if (data.Message == 'Customer Found!') {
  //       setSearchResult(`Found: ${data.accountnumber}`);
  //     } else {
  //       setSearchResult('Not Found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setSearchResult('Error fetching data');
  //   }
  // };
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://192.168.19.35:8081/customers/${searchValue}`);
      const data = await response.json();
      
      if (response.ok) {
        if (data.Message === 'Customer Found!') {
          setSearchResult(`<table><thead><tr><th>Account Number</th><th>First Name</th><th>Phone</th></tr></thead><tbody><tr><td>${data.accountnumber}</td><td>${data.firstname} ${data.lastname}</td><td>${data.phonenumber}</td></tr></tbody></table>`);
        } else {
          setSearchResult('<div class="sec_empty"><p>Not Found</p><a class="btn_show empty" href="#2">Create Customer</a></div>');
        }
      } else {
        setSearchResult('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResult('Error fetching data');
    }
  };
  

  return (
    <main className="page">
        <div className="top">
          <Image src={logo} alt="" width={100} height={100} />
        </div>
        <div className="board">
          <nav>
            <ul>
              <li>
                <a
                  className={`btn_show ${activeSection === '1' ? 'active' : ''}`}
                  href="#1"
                  onClick={() => handleButtonClick('1')}
                >
                  Search
                </a>
              </li>
              <li>
                <a
                  className={`btn_show ${activeSection === '2' ? 'active' : ''} ${
                    activeSection === '2' ? 'empty' : ''
                  }`}
                  href="#2"
                  onClick={() => handleButtonClick('2')}
                >
                  Create Customer
                </a>
              </li>
            </ul>
          </nav>
          <div className={`box ${activeSection === '1' ? 'active' : ''}`} id="1">
              <div className="search_input">
                 <input
                    type="text"
                    id="searchInput"
                    placeholder="Search by number..."
                    onChange={handleInputChange}
                  />
                  <button className="btn_search" onClick={handleSearch}>
                    Search
                  </button>

              
              
              </div>
              <div className="list" id="result"  dangerouslySetInnerHTML={{ __html: searchResult }}>
                  {/* {searchResult} */}
              </div>
          
          </div>
          <div className={`box ${activeSection === '2' ? 'active' : ''}`} id="2">
            <form action="">
              <div className="all_input">
                <div className="s_row">
                  <label htmlFor="">First Name</label>
                  <input type="text" />
                </div>
                <div className="s_row">
                  <label htmlFor="">Last Name</label>
                  <input type="text" />
                </div>
                <div className="s_row">
                  <label htmlFor="">Email</label>
                  <input type="email" />
                </div>
                <div className="s_row">
                  <label htmlFor="">Phone Number</label>
                  <input type="number" />
                </div>
              </div>
              <button className="btn">New Account</button>
            </form>
          </div>
        </div>
    </main>
  );
}
