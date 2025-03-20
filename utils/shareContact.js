'use server'
import { uploadUser } from '@/utils/Actions'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function isValidText(text) {
    return !text || text.trim() === ''
}

export async function shareContact (prevState, formData) {
    const user = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        message: formData.get('message')
    }
    console.log(user)
    if (isValidText(user.name) || 
        isValidText(user.email) ||
        isValidText(user.phone) ||
        isValidText(user.message) ||
        isValidText(user.address)
     ){
        return {
            message: 'All inputs are required!'
        }
     }

     await uploadUser(user)
     revalidatePath('/contact')
     redirect('/contact')

}
