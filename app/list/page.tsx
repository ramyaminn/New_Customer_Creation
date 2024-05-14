"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../public/img/carina_logo.png';
import '../../public/sass/main.css';
import { API_ENDPOINT_customers } from '../../general/api';

export default function Page() {
  const [activeSection, setActiveSection] = useState('1');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [sectionError, setSectionError] = useState('');
  const [showError, setShowError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    emailaddress: '',
    phonenumber: '',
  });

  const handleButtonClick = (sectionId = '') => {
    setActiveSection(sectionId);
  };

  const handleInputChange = (e: { target: { value: string; }; }) => {
    const value = e.target.value.trim();
    setSearchValue(value);
  };

  const isValidString = (str: string | any[]) => str.length >= 11;
  const handleSearch = async (e: any) => {
      
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
      const response = await fetch(`${API_ENDPOINT_customers}/${searchValue}`);
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

  

  const handleFormSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const response = await fetch(`${API_ENDPOINT_customers}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });
      const responseData = await response.json();
  
      if (response.status === 201) {
        // Account created successfully
        console.log('Account created:', responseData);
        // Optionally, reset the form data after successful submission
        setFormData({
          firstname: '',
          lastname: '',
          emailaddress: '',
          phonenumber: '',
        });
        // Set the success message
        setFormErrorMessage('<div class="sec_successfully"><p>Account created successfully</p></div>');
        // Set a timeout to hide the error message after 5 seconds
        setTimeout(() => {
          setFormErrorMessage('');
        }, 5000);

        return { success: true, message: 'Account created successfully' };
      } else if (response.status === 422) {
        // Check specific error messages
        if (responseData.detail === 'PhoneNumber Already Exist!') {
          // Set error message for phone number already exists
          setFormErrorMessage('<div class="sec_error"><p>PhoneNumber Already Exists!</p></div>');
            // Set a timeout to hide the error message after 5 seconds
            setTimeout(() => {
              setFormErrorMessage('');
            }, 5000);
          return { success: false, message: 'PhoneNumber Already Exists!' };
       
        } else if (response.status === 422) {
          // Check specific error messages
          if (responseData.detail && responseData.detail.length > 0) {
            // Loop through each error detail object
            for (const errorDetail of responseData.detail) {
              if (errorDetail.msg === 'String should have at least 11 characters') {
                // Set error message for string length validation
                setFormErrorMessage('<div class="sec_error"><p>String should have at least 11 characters.</p></div>');

+               // Set a timeout to hide the error message after 5 seconds
                setTimeout(() => {
                  setFormErrorMessage('');
                }, 5000);

                return { success: false, message: 'String should have at least 11 characters' };
              }
              // Add more conditions to handle other specific error messages if needed
            }
          }
        }
      }
    } catch (error) {
      console.error('Error creating account:', error);
      // Set a generic form submission error message for network errors
      setFormErrorMessage('Error creating account');
      return { success: false, message: 'Error creating account' };
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
            {formErrorMessage && (
              <div dangerouslySetInnerHTML={{ __html: formErrorMessage }} />
            )}
            <form action="">
              <div className="all_input">
                <div className="s_row">
                  <label htmlFor="">First Name</label>
                  <input
                      type="text"
                      value={formData.firstname}
                      onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                  />
                </div>
                <div className="s_row">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  />
                </div>
                <div className="s_row">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    value={formData.emailaddress}
                    onChange={(e) => setFormData({ ...formData, emailaddress: e.target.value })}
                  />
                </div>
                <div className="s_row">
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="number"
                    value={formData.phonenumber}
                    onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
                  />
                </div>
                
              </div>
              <button className="btn" onClick={handleFormSubmit}>New Account</button>
            </form>
          </div>
        </div>
    </main>
  );
}
