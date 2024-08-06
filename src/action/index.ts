'use server'
import { revalidateTag } from 'next/cache'
export const handleCreateUserAction= async(data:any)=>{
    const res = await fetch('http://localhost:8000/users',
        {
          method: "POST",
          body:JSON.stringify(data),
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
          }  
        })
        revalidateTag('list-user')
        return await res.json();
      
    // console.log("check>>>>>>>>",data);
    
}
export const handleUpdateUserAction= async(data:any)=>{
  const res = await fetch(`http://localhost:8000/users/${data.id}`,
      {
        method: "PUT",
        body:JSON.stringify(data),
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json'
        }  
      })
      revalidateTag('list-user')
      return await res.json();
    
  // console.log("check>>>>>>>>",data);
  
}
export const handleDeleteUserAction = async (data: any) => {
  const res = await fetch(`http://localhost:8000/users/${data.id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
  })
  revalidateTag("list-users")
  return await res.json()
}
