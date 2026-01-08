import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import APICallService from '../../../api/apiCallService';
import CustomDatePicker from '../../custom/DateRange/DatePicker';
import { CustomSelectWhite } from '../../custom/select/CustomSelectWhite';
import { error, success } from '../../../global/toast';
import CustomDateInput from '../../custom/DateRange/CustomDateInput';
import Loader from '../../../global/loader';
import { PLANT } from '../../../api/apiEndPoints';
import { PLANTAPIJSON } from '../../../api/apiJSON/plant';
import { USER } from '../../../api/apiEndPoints';
import { USERAPIJSON } from '../../../api/apiJSON/user';

const addPlant = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [userOptions, setUserOptions] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [formData, setFormData] = useState<any>({
        userId: null,
        propertyName: '',
        propertyTypes: 0,
        address: '',
        city: '',
        state: '',
        pincode: 0,
        roofArea: 0,
        billAmount: 0,
        billImage: null,
        electricityRate: '',
        plantStatus: '',
    });
    const [validation, setValidation] = useState<any>({
        userId: false,
        propertyName: false,
        propertyTypes: false,
        address: false,
        city: false,
        state: false,
        pincode: false,
        roofArea: false,
        billAmount: false,
        billImage: false,
        electricityRate: false,
        plantStatus: false,
    });

    // Fetch users from dropdown
    useEffect(() => {
        const fetchUsers = async () => {
            const params = {
                page: 1,
                limit: 1000,
                sortKey: '_createdAt',
                sortOrder: -1,
                needCount: false,
            };
            const apiService = new APICallService(
                USER.LISTUSER,
                USERAPIJSON.listUser(params)
            );

            const response = await apiService.callAPI();
            if (response && response.records) {
                const options = response.records.map((user: any) => ({
                    value: user._id,
                    label: `${user.name}`
                }));
                setUserOptions(options);
            }
        };
        fetchUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            //Validate file type
            const validTypes = [
                'application/pdf',
                'image/jpg',
                'image/jpeg',
                'image/png'
            ];

            if (!validTypes.includes(file.type)) {
                error('Only JPG/JPEG/PNG files are allowed');
                e.target.value = ''; // Clear invalid file
                validateField('billImage', null);
                return;
            }
        }

        setFormData({
            ...formData,
            billImage : file
        });
        validateField('billImage', file)
    }

    const validateField = (name: string, value: any) => {
        let isInvalid = false;
        if(name === 'propertyName') {
            isInvalid = value.trim() === '';
        } else if( name === 'propertyTypes') {
            isInvalid = value.trim() === '';
        } else if (name === 'address') {   
            isInvalid = value.trim() === '';
        } else if( name === 'city') {
            isInvalid = value.trim() === '';
        } else if (name === 'state') {   
            isInvalid = value.trim() === '';
        } else if( name === 'pincode') {
            isInvalid = value.trim() === '';
        } else if (name === 'roofArea') {   
            isInvalid = value.trim() === '';
        } else if( name === 'billAmount') {
            isInvalid = value.trim() === '';
        } else if (name === 'billImage') {   
            isInvalid = value.trim() === '';
        } else if (name === 'electricityRate') {   
            isInvalid = value.trim() === '';
        } else if( name === 'plantStatus') {
            isInvalid = value.trim() === '';
        } else if (name === 'billImage') {   
            isInvalid = value.trim() === '';
        } else if( name === 'userId') {
            isInvalid = value === null;
        }

        setValidation((prev) => ({
            ...prev,
            [name]: isInvalid,
        }));
    }
}

export default addPlant;