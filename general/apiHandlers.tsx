"use client";
import { Dispatch, SetStateAction, useState } from 'react';
import { API_ENDPOINT_customers } from './api';
// import EditModal from '../general/EditModal';

type FormData = {
  firstname: string;
  lastname: string;
  emailaddress: string;
  phonenumber: string;
  internationalnumber: string;
  countrycode: string;
  id?: string; // Add id to the form data type
};


export const handleFormSubmit = async (
  e: React.FormEvent,
  formData: FormData,
  setFormData: Dispatch<SetStateAction<FormData>>,
  setFormErrorMessage: Dispatch<SetStateAction<string>>,
  setSearchResult: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  e.preventDefault();
  setSearchResult('');
  setFormErrorMessage('');
  setLoading(true);

  const API_BASE_URL = `${API_ENDPOINT_customers}`;
  const ALTERNATE_API_BASE_URL = `${API_ENDPOINT_customers}/create_global`; 

  const { phonenumber, internationalnumber, countrycode } = formData;
  const useInternationalNumber = internationalnumber && internationalnumber.length > 0;

  const phoneToSearch = useInternationalNumber ? internationalnumber : phonenumber;

  const isPhoneNumberValid = (phone: string) =>
    useInternationalNumber ? phone.length >= 8 && phone.length <= 20 : phone.length === 11;

  if (!isPhoneNumberValid(phoneToSearch)) {
    setFormErrorMessage('<div class="sec_error"><p>رقم الهاتف خاطئ</p></div>');
    setTimeout(() => {
      setFormErrorMessage('');
    }, 5000);
    setLoading(false);
    return { success: false, message: 'Invalid phone number' };
  }

  try {
    // phone number to search
    const searchResponse = await fetch(`${API_BASE_URL}/${phoneToSearch}`);
    const searchResponseData = await searchResponse.json();

    if (searchResponse.status === 200) {
      const { id, accountnumber, firstname, lastname, phonenumber: fetchedPhonenumber } = searchResponseData;

      setFormErrorMessage('<div class="sec_error"><p>رقم الهاتف موجود بالفعل</p></div>');
      setSearchResult(
       `<div class="sec_table"><table><thead><tr><th>رقم الحساب</th><th>الأسم</th><th>رقم الهاتف</th><th>Id</th></tr></thead><tbody><tr><td>${accountnumber}</td><td>${firstname} ${lastname}</td><td>${fetchedPhonenumber}</td><td>${id}</td></tr></tbody></table></div>`
      );

      setTimeout(() => {
        setFormErrorMessage('');
      }, 5000);
    } else if (searchResponse.status === 404) {
      const sanitizedCountryCode = countrycode.replace(/[^\d]/g, ''); // Remove any non-digit characters from the countrycode
      const createData = {
        ...formData,
        id: undefined, // Ensure new accounts don't send an id
        phonenumber: useInternationalNumber ? `00${sanitizedCountryCode}${internationalnumber}` : phonenumber, 
      };

      const createEndpoint = useInternationalNumber ? ALTERNATE_API_BASE_URL : `${API_BASE_URL}/create`;
      
      const createResponse = await fetch(createEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createData),
      });

      const createResponseData = await createResponse.json();

      if (createResponse.status === 201) {
        console.log('Account created:', createResponseData);
        // const { id } = createResponseData;
        setFormData({
          id: '', // Set the id to the form data if available
          firstname: '',
          lastname: '',
          emailaddress: '',
          phonenumber: '',
          internationalnumber: '',
          countrycode: "+20",
        });
        setFormErrorMessage('<div class="sec_successfully"><p>تم إنشاء الحساب</p></div>');
        setSearchResult('');
      } else if (createResponse.status === 422 && createResponseData.detail?.length > 0) {
        for (const errorDetail of createResponseData.detail) {
          if (errorDetail.msg === 'String should have at least 11 characters') {
            setFormErrorMessage('<div class="sec_error"><p>رقم الهاتف خاطئ</p></div>');
          }
        }
      }
    }
  } catch (error) {
    console.error('Error creating account:', error);
    setFormErrorMessage('<div class="sec_error"><p>حدث خطأ أثناء إنشاء الحساب</p></div>');
  } finally {
    setLoading(false);
  }

  return { success: true, message: 'Account created successfully' };
};