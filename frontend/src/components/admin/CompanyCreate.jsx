import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import { Loader2 } from 'lucide-react';
import { setLoading } from '@/redux/authSlice';

function CompanyCreate() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector((store)=>store.auth.loading);

    const registerNewCompany = async () => {
        try {
            if (!companyName) {
                toast.error('Please enter a company name');
                return;
            }
            dispatch(setLoading(true));
            const response = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.data.success) {
                dispatch(setSingleCompany(response.data.company));
                toast.success(response.data.message);
                const companyId = response.data.company._id;
                navigate(`/admin/companies/${companyId}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p>What would you like to give your company name? you can change this later.</p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type='text'
                    className='my-2 rounded-xl'
                    placeholder='JobHunt, Microsoft etc.'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button className='rounded-xl' variant='outline' onClick={() => navigate('/admin/companies')}>Cancel</Button>
                    {
                        loading ? <Button className='rounded-xl text-white bg-black hover:bg-slate-700'><Loader2 className='animate-spin' />Please wait</Button> : <Button onClick={registerNewCompany} className='rounded-xl text-white bg-black hover:bg-slate-700'>Continue</Button>
                    }
                </div>
            </div>
        </div>
    );
}

export default CompanyCreate;