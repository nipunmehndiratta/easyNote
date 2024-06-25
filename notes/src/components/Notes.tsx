import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { notesState } from "@/store/atoms/notes";
import Note from "./Note";

export default function Notes() {
    const [notes, setNotes] = useRecoilState(notesState);
    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const closeDialog = () => {
        setTitle("");
        setDescription("");
        setError("");
        setShowDialog(false);
    };

    const handleCreateNote = async () => {
        try {
            if (title.trim() === "") {
                setError("Note title cannot be empty");
                return;
            }

            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notes`, { title, description }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const newNote = response.data;
            setNotes([...notes, newNote]);
            setShowDialog(false);
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error creating note:", error);
            setError("Failed to create note. Please try again.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setNotes(response.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2 p-6">
            <button onClick={() => setShowDialog(true)} className="bg-orange-400 rounded-lg max-h-16 min-w-48">
                <div className="flex justify-between p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="text-white">Add new note</span>
                </div>
            </button>
            {showDialog && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="relative bg-white rounded-xl max-w-60 grid grid-col pt-3 pl-5 pb-3 pr-5 shadow-md min-h-80 min-w-80">
                        <div className="flex justify-between">
                            <input className="w-full outline-none p-2" placeholder="Business Idea" onChange={(e) => { setTitle(e.target.value); setError("")}} />
                            <button onClick={closeDialog}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <textarea className="w-full min-h-40 outline-none p-2" placeholder="A pharmacy app delivering medicines within 10 minutes..." onChange={(e) => { setDescription(e.target.value) }} />
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <button className="ml-48 bg-orange-400 text-white rounded max-h-10" onClick={handleCreateNote}>Create</button>
                    </div>
                </div>

            )}
            </div>
            <div className="bg-gray-100 p-10 rounded-tl-[36px] col-span-10 min-h-screen">
                {notes.length>0 ? 
               <div className="grid grid-cols-1 gap-4 justify-self-center gap-x-4 gap-y-8 justify-items-center md:grid-cols-2 xl:grid-cols-4 ">
               {notes.map((note) => (
                   <div key={note._id} className="col-span-1">
                       <Note title={note.title} description={note.description} _id={note._id} />
                   </div>
               ))}
                </div>
                :
                <div className="flex flex-col h-full justify-center items-center">
                    <img className="max-w-24 max-h-24 rounded-lg mb-8" src="/note.jpeg"/>
                <div className="text-center">
                    <span className="text-orange-400 text-2xl font-bold block">Create your first note</span>
                    <span className="text-orange-400 block text-lg">Click the + Add New Note button to get started.</span>
                </div>
            </div>            
        
                }
            </div>
        </div>
    )
}
