
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

function Navbar() {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div className=''>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to='/admin/companies'>Companies</Link></li>
                                    <li><Link to='/admin/jobs'>Jobs</Link></li>
                                </>
                            ) :
                                (
                                    <>
                                        <li><Link to='/'>Home</Link></li>
                                        <li><Link to='/jobs'>Jobs</Link></li>
                                        <li><Link to='/browse'>Browse</Link></li>
                                    </>
                                )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant='outline' className='rounded-xl'>Login</Button></Link>
                                <Link to="/signup"><Button className='bg-[#6A38C2] rounded-xl hover:bg-[#5b30a6]'>Signup</Button></Link>
                            </div>
                        )
                            : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto || "data:image/jpeg;base64,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"} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className='bg-white rounded-xl w-80'>
                                        <div>
                                            <div className='flex gap-4 space-y-2'>
                                                <Avatar className='cursor-pointer'>
                                                    <AvatarImage src={user?.profile?.profilePhoto || "data:image/jpeg;base64,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"} alt="@shadcn" />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3 my-2 text-gray-600'>
                                                {
                                                    user && user.role === 'student' && 
                                                    <div className='flex w-fit items-center cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to='/profile'>View Profile</Link> </Button>
                                                    </div>
                                                }
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                    }
                </div >
            </div >
        </div >
    )
}

export default Navbar