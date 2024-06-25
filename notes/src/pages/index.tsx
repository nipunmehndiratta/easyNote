import { Inter } from "next/font/google";
import Appbar from "@/components/Appbar";
import Notes from "@/components/Notes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/atoms/user";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {

  return (
      <div className="bg-white min-w-full min-h-screen">
        <InitUser/>
        <Appbar/>
        <Notes/>
      </div>
  );
}

function InitUser() {
  const setUsername = useSetRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }).then((response)=>{
          if(response.data.username){
          setUsername(response.data.username);
          }
          else{
            router.push('/signup');
          }
        })
        .catch((error)=>{
          router.push('/signup');
        })
      } 

    fetchUser(); 
  }, []); 

  return null; 
}
