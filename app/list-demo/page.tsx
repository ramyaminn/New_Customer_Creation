
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/img/carina_logo.png';
import '../../public/sass/main.css';

export default function Page() {
  const [activeSection, setActiveSection] = useState('1');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [sectionError, setSectionError] = useState('');
  const [showError, setShowError] = useState(false);
  

  const handleButtonClick = (sectionId = '') => {
    setActiveSection(sectionId);
  };

  const handleInputChange = (e: { target: { value: string; }; }) => {
    const value = e.target.value.trim();
    setSearchValue(value);
  };

 
  const isValidString = (str: string | any[]) => str.length >= 11;

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
      // Validate input length
      //   if (searchValue.length !== 11 || !isValidString(searchValue)) {
      //     setSectionError('<div class="sec_error"><p>should have at least 11 characters.</p></div>');
      //   return { success: false, message: 'Invalid input' };
      // }
      setSearchResult('');
      setSectionError('');
      setShowError(false);

      if (searchValue.length !== 11 || !isValidString(searchValue)) {
        setSectionError('<div class="sec_error"><p>should have at least 11 characters.</p></div>');
        setShowError(true);
  
        // setTimeout(() => {
        //   setShowError(false);
        // }, 2500);
  
        return { success: false, message: 'Invalid input' };
      }



    try {
      const response = await fetch(`http://192.168.19.35:8081/customers/${searchValue}`);
      const responseData  = await response.json();
      
      if (response.status === 200) {
        const { accountnumber, firstname, lastname, phonenumber } = responseData[0];
        setSearchResult(`<table><thead><tr><th>Account Number</th><th>First Name</th><th>Phone</th></tr></thead><tbody><tr><td>${accountnumber}</td><td>${firstname} ${lastname}</td><td>${phonenumber}</td></tr></tbody></table>`);
       
      } else if (response.status === 404) {
        setSearchResult('<div class="sec_empty"><p>Customer Not Found</p><a class="btn_show empty" href="#2">Create Customer</a></div>');
        return { success: false, message: 'Customer not found' };
      } else if (response.status === 500) {
        setSearchResult('Error fetching dataa');
        return { success: false, message: 'Error fetching data' };
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResult('Error fetching data server');
      return { success: false, message: 'Error fetching data' };
    }
  }; 
  
  

  return (
    <main className="page-demo">
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
              {showError && (
                <div className="list_error" id="result" dangerouslySetInnerHTML={{ __html: sectionError }}></div>
              )}
              <div className="search_input">
                 <input
                    type="number"
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
