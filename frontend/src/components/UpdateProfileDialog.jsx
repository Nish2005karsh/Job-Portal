import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { ScrollArea } from './ui/scroll-area'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || "",
        experience: user?.profile?.experience || [],
        education: user?.profile?.education || []
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    // Experience Handlers
    const handleExperienceChange = (index, e) => {
        const newExperience = [...input.experience];
        newExperience[index][e.target.name] = e.target.value;
        setInput({ ...input, experience: newExperience });
    };

    const addExperience = () => {
        setInput({
            ...input,
            experience: [...input.experience, { title: "", company: "", startDate: "", endDate: "", description: "" }]
        });
    };

    const removeExperience = (index) => {
        const newExperience = input.experience.filter((_, i) => i !== index);
        setInput({ ...input, experience: newExperience });
    };

    // Education Handlers
    const handleEducationChange = (index, e) => {
        const newEducation = [...input.education];
        newEducation[index][e.target.name] = e.target.value;
        setInput({ ...input, education: newEducation });
    };

    const addEducation = () => {
        setInput({
            ...input,
            education: [...input.education, { degree: "", institution: "", startDate: "", endDate: "", description: "" }]
        });
    };

    const removeEducation = (index) => {
        const newEducation = input.education.filter((_, i) => i !== index);
        setInput({ ...input, education: newEducation });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        formData.append("experience", JSON.stringify(input.experience));
        formData.append("education", JSON.stringify(input.education));

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[70vh] pr-4">
                        <form onSubmit={submitHandler}>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor="name" className="text-right">Name</Label>
                                    <Input id="name" name="fullname" value={input.fullname} onChange={changeEventHandler} className="col-span-3" />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor="email" className="text-right">Email</Label>
                                    <Input id="email" name="email" value={input.email} onChange={changeEventHandler} className="col-span-3" />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor="number" className="text-right">Number</Label>
                                    <Input id="number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3" />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor="bio" className="text-right">Bio</Label>
                                    <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3" />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor="skills" className="text-right">Skills</Label>
                                    <Input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} className="col-span-3" />
                                </div>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor="file" className="text-right">Resume</Label>
                                    <Input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} className="col-span-3" />
                                </div>

                                {/* Experience Section */}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-semibold">Experience</h3>
                                        <Button type="button" variant="outline" size="sm" onClick={addExperience}><Plus className="h-4 w-4" /></Button>
                                    </div>
                                    {input.experience.map((exp, index) => (
                                        <div key={index} className="grid gap-2 mb-4 p-4 border rounded bg-gray-50 relative">
                                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(index)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                            <Input placeholder="Title" name="title" value={exp.title} onChange={(e) => handleExperienceChange(index, e)} />
                                            <Input placeholder="Company" name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} />
                                            <div className="grid grid-cols-2 gap-2">
                                                <Input type="date" name="startDate" value={exp.startDate?.split('T')[0]} onChange={(e) => handleExperienceChange(index, e)} />
                                                <Input type="date" name="endDate" value={exp.endDate?.split('T')[0]} onChange={(e) => handleExperienceChange(index, e)} />
                                            </div>
                                            <Input placeholder="Description" name="description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} />
                                        </div>
                                    ))}
                                </div>

                                {/* Education Section */}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-semibold">Education</h3>
                                        <Button type="button" variant="outline" size="sm" onClick={addEducation}><Plus className="h-4 w-4" /></Button>
                                    </div>
                                    {input.education.map((edu, index) => (
                                        <div key={index} className="grid gap-2 mb-4 p-4 border rounded bg-gray-50 relative">
                                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(index)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                            <Input placeholder="Degree" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
                                            <Input placeholder="Institution" name="institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} />
                                            <div className="grid grid-cols-2 gap-2">
                                                <Input type="date" name="startDate" value={edu.startDate?.split('T')[0]} onChange={(e) => handleEducationChange(index, e)} />
                                                <Input type="date" name="endDate" value={edu.endDate?.split('T')[0]} onChange={(e) => handleEducationChange(index, e)} />
                                            </div>
                                            <Input placeholder="Description" name="description" value={edu.description} onChange={(e) => handleEducationChange(index, e)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <DialogFooter>
                                {
                                    loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                                }
                            </DialogFooter>
                        </form>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog