import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { setLoading } from '@/redux/authSlice';
import useGetCompanyById from '@/hooks/useGetCompanyById';

function CompanySetup() {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        location: "",
        website: "",
        file: null
    });

    const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { singleCompany } = useSelector((store) => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true)); // set loading to true before request

            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params?.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Something went wrong!");
        } finally {
            dispatch(setLoading(false)); // Ensure loading is false after request (success or error)
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            location: singleCompany?.location || "",
            website: singleCompany?.website || "",
            file: null // file should initially be set to null for proper file handling
        });
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={submitHandler}>
                    <div className="flex items-center gap-5 p-8">
                        <Button
                            onClick={() => navigate("/admin/companies")}
                            variant="outline"
                            className="flex items-center gap-2 text-gray-500 font-semibold rounded-xl"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold text-xl">Company Setup</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {loading ? (
                        <Button className="w-full py-2 px-4 mt-3 text-white bg-black hover:bg-slate-700">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full py-2 px-4 mt-3 text-white bg-black hover:bg-slate-700">
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default CompanySetup;
