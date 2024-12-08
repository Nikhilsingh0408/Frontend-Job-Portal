import React from "react";
import Navbar from "./shared/Navbar";

const AboutUs = () => {
    return (
        <div>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        About Us
                    </h1>
                    <div className="max-w-4xl mx-auto text-gray-700">
                        <p className="text-lg mb-6">
                            Welcome to <span className="font-semibold">Job Hunt</span>, your number one platform for finding the perfect job. Our mission is to connect job seekers with the best employers in the industry and help businesses find the right talent.
                        </p>
                        <p className="text-lg mb-6">
                            Founded in 2024, Job Portal has grown to become a trusted name in the job search industry, offering users a smooth and seamless experience. We are committed to providing you with the best service, whether you are searching for a new career opportunity or looking to hire top talent.
                        </p>
                        <p className="text-lg mb-6">
                            Our platform offers a wide range of job listings across various sectors, making it easy for users to search for jobs based on their preferences. We believe in transparency, efficiency, and a user-friendly experience to help you land your dream job.
                        </p>
                        <p className="text-lg mb-6">
                            At Job Portal, we pride ourselves on our customer support and strive to continually improve our services. If you have any questions or suggestions, feel free to get in touch with us.
                        </p>
                        <p className="text-lg font-semibold text-center">
                            Join us today and take the first step towards your dream career!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
