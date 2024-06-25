import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { notesState } from "@/store/atoms/notes";
import { notesType } from "@/types/notesType";

export default function Note(props: notesType) {
    const [notes, setNotes] = useRecoilState(notesState);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);

    const handleDeleteNote = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/${props._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                const updatedNotes = notes.filter(note => note._id !== props._id);
                setNotes(updatedNotes);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const handleEditNote = async () => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notes/${props._id}`, {
                title,
                description
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response);
        } catch (error) {
            console.error("Error editing note:", error);
        }
    };

    return (
        <div className="relative bg-white rounded-xl max-w-60 grid grid-col pt-3 pl-5 pb-3 shadow-md pr-3">
            <div className="flex justify-between">
                <input value={title} className="text-black font-bold text-2xl outline-none max-w-44" onChange={(e) => {
                    setTitle(e.target.value);
                }}
                onBlur={handleEditNote}/>
                <button onClick={handleDeleteNote}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-5 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

                </button>
            </div>
           
            <textarea 
                className="text-gray-400 pt-2 outline-none" 
                value={description} 
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
                onBlur={handleEditNote}
                />
        </div>
    );
}
