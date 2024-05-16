"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/img/unnamed-white.png';
import '../../public/sass/main.css';
import { handleSearch, handleFormSubmit, handleButtonClick, handleInputChange } from '../../general/apiHandlers';

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

  return (
    <main className="page">
      <div className="top">
        <Image src={logo} alt="" width={400} height={93} />
        <h2>Customer Creation</h2>
      </div>
      <div className="board">
        <nav>
          <ul>
            <li>
              <a
                className={`btn_show ${activeSection === '1' ? 'active' : ''}`}
                href="#1"
                onClick={() => handleButtonClick('1', setActiveSection)}
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
                onClick={() => handleButtonClick('2', setActiveSection)}
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
              onChange={(e) => handleInputChange(e, setSearchValue)}
            />
            <button className="btn_search" onClick={() => handleSearch(searchValue, setSearchResult, setSectionError, setShowError)}>
              Search
            </button>
          </div>
          <div className="list" id="result" dangerouslySetInnerHTML={{ __html: searchResult }}>
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
            <button className="btn" onClick={(e) => handleFormSubmit(e, formData, setFormData, setFormErrorMessage)}>New Account</button>
          </form>
        </div>
      </div>
    </main>
  );
}
