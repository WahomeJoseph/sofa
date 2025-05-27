'use client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import Link from 'next/link'
import { LogOut, User, ShoppingBag } from 'lucide-react'
import { toast, Toaster } from 'sonner'
import { Separator } from '../ui/separator'

export default function AccountNav() {
  const { data: session } = useSession()
  const router = useRouter()

  const avatarFallback = session?.user?.name?.charAt(0)?.toUpperCase() || 'U'

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      toast.success('Signed out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Could not sign out')
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Toaster position='top-center' richColors/>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-amber-50 focus:ring-2 focus:ring-amber-200">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session.user?.image}
                  alt={session.user?.name || 'User'}
                />
                <AvatarFallback className="bg-amber-500 text-white font-medium">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 p-2 shadow-lg border border-gray-100 rounded-lg">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session.user?.name || 'My Account'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session.user?.email}
              </p>
            </div>

            <Separator className="my-1" />

            <DropdownMenuItem asChild>
              <Link
                href="/account"
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-amber-50 rounded">
                <User className="h-4 w-4 text-amber-600" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/orders"
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-amber-50 rounded">
                <ShoppingBag className="h-4 w-4 text-amber-600" />
                Orders
              </Link>
            </DropdownMenuItem>

            <Separator className="my-1" />

            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded">
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          <span className='border border-amber-600/20 px-3 py-2 rounded-md hover:rounded-full hover:bg-amber-600'>
            <Link href="/sign-up">Register</Link>
          </span>
        </div>
      )}
    </div>
  )
}